# Hostinger runtime initialization

The managed Node.js runtime runs the application through `npm start`. On startup, the application now:
1. checks the MySQL connection;
2. applies pending SQL migrations idempotently;
3. optionally creates the first Perfect Line owner and default plans when ADMIN_EMAIL and ADMIN_PASSWORD are set.

This avoids requiring npm/SSH commands on managed Hostinger Web App plans, where npm commands are handled by the deployment process rather than SSH.

After the first successful bootstrap, remove ADMIN_PASSWORD from the Hostinger environment and redeploy/restart the application. Keep ADMIN_EMAIL only if useful for reference; it is not required for normal login.
