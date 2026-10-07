import 'dotenv/config';
import {query,transaction} from '../server/db.mjs';

const memberships=await query(`SELECT ms.id,ms.tenant_id,ms.end_date
FROM memberships ms
WHERE ms.status<>'SUSPENDED'
  AND ms.end_date<=DATE_ADD(UTC_DATE(),INTERVAL 30 DAY)`);
let updated=0,notices=0;
await transaction(async c=>{
  for(const m of memberships){
    const end=new Date(m.end_date);
    const today=new Date(); today.setUTCHours(0,0,0,0);
    const in7=new Date(today); in7.setUTCDate(in7.getUTCDate()+7);
    const status=end<today?'EXPIRED':end<=in7?'EXPIRING':'ACTIVE';
    const r=await c.execute('UPDATE memberships SET status=? WHERE id=? AND status<>?',[status,m.id,status]);
    updated+=Number(r.affectedRows||0);
    let key=null;
    if(status==='EXPIRED') key='membership-expired';
    else if(status==='EXPIRING') key='membership-expiring-7';
    else { const d=Math.ceil((end.getTime()-today.getTime())/86400000); if(d<=30) key='membership-expiring-30'; }
    if(key){
      const [r2]=await c.execute('INSERT IGNORE INTO notification_deliveries(tenant_id,membership_id,channel,notice_key) VALUES(?,?,?,?)',[m.tenant_id,m.id,'SYSTEM',key]);
      notices+=Number(r2.affectedRows||0);
    }
  }
  await c.execute('DELETE FROM sessions WHERE expires_at<=UTC_TIMESTAMP(3)');
});
console.log(JSON.stringify({checked:memberships.length,updated,notices}));
