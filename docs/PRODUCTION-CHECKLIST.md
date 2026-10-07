# Production checklist

## Hostinger Node.js Web App
- Repository: Sannino1999/perfect-line-gestionale
- Branch: main
- Node.js: 22.x
- Build: npm run build
- Start: npm start
- Output: dist
- Entry: server/index.mjs

## Environment
Set APP_URL to the real HTTPS URL and COOKIE_SECURE=true. Set MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER and MYSQL_PASSWORD using Hostinger environment variables. Never commit secrets.

## Database
1. Create a dedicated MySQL database and least-privilege application user.
2. Run database/mysql/migrations/0001_initial.sql using the migration runner.
3. Run scripts/bootstrap-mysql.mjs once with ADMIN_EMAIL and ADMIN_PASSWORD.
4. Verify backups and a restore before entering real member records.

## Expiry automation
Create a Hostinger Custom Cron Job that runs once daily, for example at 06:00 UTC:
node /path/to/app/scripts/expire-memberships.mjs
The job updates membership states, removes expired sessions and inserts idempotent SYSTEM notifications.

## Release process
Feature branch -> CI -> pull request -> merge to main -> Hostinger redeploy -> smoke test login/dashboard/customer/payment/expiry flows.
