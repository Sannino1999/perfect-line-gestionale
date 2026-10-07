# Deployment Hostinger

## Target
Deploy this repository as a Hostinger Node.js Web App from GitHub. Hostinger documents GitHub deployment for Node.js apps and supports Node.js 18/20/22/24; this project pins 22.x.

## Build / start
- Build command: `npm run build`
- Start command: `npm start`
- Output directory: `dist`
- Entry point: `server/index.mjs`

## Environment variables
Set these in Hostinger, never in Git:
- PORT: supplied/managed by Hostinger where applicable
- APP_URL: production HTTPS URL
- COOKIE_SECURE: true
- MYSQL_HOST
- MYSQL_PORT (3306 unless Hostinger provides another value)
- MYSQL_DATABASE
- MYSQL_USER
- MYSQL_PASSWORD

## First database initialization
Run the migration and bootstrap scripts in a controlled setup before enabling real users:
`npm run db:migrate`
`npm run db:bootstrap`

If Hostinger's web hosting interface does not provide a safe command runner for these scripts, execute them from a controlled environment using the same MySQL credentials, then deploy the app.

## Git flow
main = production-ready code. Feature branches are tested before merge. Hostinger should deploy the main branch for production.

## Important
Do not place real customer data in GitHub. Do not commit .env files or database dumps containing personal data.
