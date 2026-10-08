# Data lifecycle

## Default behavior
Customers are active by default. When a customer is no longer operationally managed, the application uses archive/disable rather than destructive deletion.

## Export
The owner can export the customer profile, memberships and payment history for portability/access requests.

## Destructive deletion
Do not implement unconditional hard delete in the UI. Financial and legal retention requirements may apply to payment/accounting data; deletion/anonymisation must follow the controller's documented retention policy.

## Minimisation
Collect only fields required for the service. Avoid storing health information or unnecessary identity documents unless a documented legal/business requirement exists.

## Security
Exports are authenticated, tenant-scoped and generated from server-side data. Do not put personal data in URLs, logs or source control.
