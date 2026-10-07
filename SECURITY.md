# Security baseline

Never load real member data into the development/demo environment.

Before production: HTTPS everywhere; COOKIE_SECURE=true; strong unique ADMIN_PASSWORD; rate limit login; rotate sessions; least-privilege MySQL user; encrypted backups and tested restore; audit sensitive mutations; GDPR retention, export, correction and erasure workflows; dependency scanning; security headers; monitoring and alerting.
