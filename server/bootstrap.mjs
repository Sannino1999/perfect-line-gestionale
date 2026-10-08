import crypto from 'node:crypto';
import {query,transaction} from './db.mjs';
import {hashPassword} from './auth.mjs';

export async function bootstrap(){
  const email=(process.env.ADMIN_EMAIL||'').trim().toLowerCase();
  const password=process.env.ADMIN_PASSWORD||'';
  if(!email||!password)return {created:false,reason:'bootstrap_env_missing'};
  const existing=await query('SELECT id,tenant_id FROM users WHERE email=? LIMIT 1',[email]);
  if(existing.length)return {created:false,reason:'owner_exists'};
  const tenantId=crypto.randomUUID(),userId=crypto.randomUUID(),pwd=await hashPassword(password);
  await transaction(async c=>{
    await c.execute('INSERT INTO tenants(id,name,slug,address,timezone,currency) VALUES(?,?,?,?,?,?)',[tenantId,'ASD Perfect Line','perfect-line','Via Armando Diaz, 33, 80055 Portici (NA)','Europe/Rome','EUR']);
    await c.execute('INSERT INTO users(id,tenant_id,email,password_hash,role,active) VALUES(?,?,?,?,?,1)',[userId,tenantId,email,pwd,'OWNER']);
    const plans=[['Mensile',30,5000],['Trimestrale',90,13000],['Semestrale',180,24000],['Annuale',365,40000]];
    for(const p of plans)await c.execute('INSERT INTO membership_plans(id,tenant_id,name,duration_days,price_cents) VALUES(?,?,?,?,?)',[crypto.randomUUID(),tenantId,p[0],p[1],p[2]]);
  });
  return {created:true};
}