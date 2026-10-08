# Local preview

This preview needs no MySQL and no real credentials.

1. Install Node.js 22.
2. Clone the repository.
3. Run npm install.
4. Run npm run dev.
5. Open http://localhost:5173/demo

The /demo route is a read-only visual preview with fictional data. The normal / route remains the authenticated application and does not use demo data.

For the real application, configure .env.local from .env.example and MySQL, then run the migration/bootstrap steps in the production documentation.
