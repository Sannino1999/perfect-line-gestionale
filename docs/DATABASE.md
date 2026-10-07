# MySQL database

The project deliberately uses MySQL/MariaDB with `mysql2` rather than PostgreSQL/Prisma. This keeps the runtime aligned with the existing Hostinger deployment pattern used by the separate Lubrano application and avoids introducing a second database operational model without a concrete benefit.

## Migrations
Migrations are ordered SQL files under `database/mysql/migrations`. The runner records applied versions in `schema_migrations` and executes each migration inside a transaction.

## Isolation
All customer-facing tables include `tenant_id`. API queries derive tenant_id from the authenticated server session, never from a user-supplied tenant selector.

## Backups
Production backups must be enabled and restoration tested periodically. A backup that has never been restored successfully is not considered a verified backup.
