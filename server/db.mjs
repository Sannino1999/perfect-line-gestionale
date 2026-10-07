import mysql from 'mysql2/promise';
let pool;
function cfg(){const required=['MYSQL_HOST','MYSQL_DATABASE','MYSQL_USER','MYSQL_PASSWORD'];for(const k of required)if(!process.env[k])throw new Error('Missing '+k);return {host:process.env.MYSQL_HOST,port:Number(process.env.MYSQL_PORT||3306),database:process.env.MYSQL_DATABASE,user:process.env.MYSQL_USER,password:process.env.MYSQL_PASSWORD,charset:'utf8mb4',waitForConnections:true,connectionLimit:10,queueLimit:0,connectTimeout:10000,enableKeepAlive:true,keepAliveInitialDelay:0};}
export function db(){if(!pool)pool=mysql.createPool(cfg());return pool;}
export async function query(sql,params=[]){const [rows]=await db().execute(sql,params);return rows;}
export async function execute(sql,params=[]){const [result]=await db().execute(sql,params);return result;}
export async function transaction(fn){const c=await db().getConnection();try{await c.beginTransaction();const out=await fn(c);await c.commit();return out}catch(e){await c.rollback();throw e}finally{c.release();}}