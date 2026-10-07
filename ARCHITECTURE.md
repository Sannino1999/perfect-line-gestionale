# Perfect Line Gestionale — Architecture

## Runtime
Vite + React client, Node.js/Express API, MySQL/MariaDB via mysql2. This matches the existing Hostinger production approach used in the separate Lubrano project.

## Isolation
Every business record contains tenant_id. API queries always bind tenant_id from the authenticated session; the client never chooses its tenant.

## Data model
Tenant -> User, Member, MembershipPlan, Membership, Payment, Session, AuditLog, NotificationDelivery.

## Security
HttpOnly session cookie, password hashing, prepared SQL statements, server-side authorization, tenant isolation, no secrets in source control, audit trail. Production additionally requires HTTPS, secure cookies, rate limiting, backup/restore tests, retention/deletion/export procedures and security monitoring.

## Reliability
Monetary values are integer cents. Membership status is derived from dates so the dashboard stays correct even if the scheduled worker is temporarily unavailable. NotificationDelivery has a unique key to make reminders idempotent.

## Reuse
Business branding and catalog data are tenant configuration. Core business logic is tenant-independent so another gym can be onboarded without cloning the application code.