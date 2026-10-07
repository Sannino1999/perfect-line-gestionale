import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import {query,execute} from './db.mjs';
const hashToken=(token)=>crypto.createHash('sha256').update(token).digest('hex');
export const hashPassword=(p)=>bcrypt.hash(p,12);
export const verifyPassword=(p,h)=>bcrypt.compare(p,h);
export const newToken=()=>crypto.randomBytes(32).toString('hex');
export async function createSession(userId,tenantId){const token=newToken(),expires=new Date(Date.now()+7*24*60*60*1000);await execute('INSERT INTO sessions (token_hash,user_id,tenant_id,expires_at) VALUES (?,?,?,?)',[hashToken(token),userId,tenantId,expires]);return {token,expires}}
export async function getSession(req){const token=req.cookies?.pl_session;if(!token)return null;const rows=await query('SELECT s.token_hash,s.user_id,s.tenant_id,s.expires_at,u.email,u.role,t.name tenant_name,t.slug tenant_slug FROM sessions s JOIN users u ON u.id=s.user_id AND u.active=1 JOIN tenants t ON t.id=s.tenant_id WHERE s.token_hash=? AND s.expires_at>UTC_TIMESTAMP(3) LIMIT 1',[hashToken(token)]);return rows[0]||null}
export function setSessionCookie(res,token){const secure=process.env.COOKIE_SECURE==='true';res.setHeader('Set-Cookie',`pl_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800${secure?'; Secure':''}`)}
export function clearSessionCookie(res){res.setHeader('Set-Cookie','pl_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0')}
export async function requireSession(req,res,next){const s=await getSession(req).catch(()=>null);if(!s)return res.status(401).json({error:'UNAUTHORIZED'});req.session=s;next();}
