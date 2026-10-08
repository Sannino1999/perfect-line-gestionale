import {readFile,readdir} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {transaction} from './db.mjs';

const root=join(dirname(fileURLToPath(import.meta.url)),'../database/mysql/migrations');
export async function migrate(){
  await transaction(async c=>{await c.query('CREATE TABLE IF NOT EXISTS schema_migrations(version VARCHAR(120) PRIMARY KEY, applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci')});
  const files=(await readdir(root)).filter(x=>/^\d+_.+\.sql$/.test(x)).sort();
  for(const file of files){
    const version=file.replace(/\.sql$/,'');
    const rows=await (await import('./db.mjs')).query('SELECT version FROM schema_migrations WHERE version=?',[version]);
    if(rows.length)continue;
    const sql=await readFile(join(root,file),'utf8');
    await transaction(async c=>{
      for(const stmt of sql.split(/;\s*(?:\r?\n|$)/).map(x=>x.trim()).filter(Boolean)) await c.query(stmt);
      await c.execute('INSERT INTO schema_migrations(version) VALUES(?)',[version]);
    });
    console.log('migration applied',version);
  }
}