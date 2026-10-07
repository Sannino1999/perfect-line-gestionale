# Perfect Line Gestionale

Gestionale web per **ASD Perfect Line**, costruito come piattaforma riutilizzabile per palestre, studi e associazioni sportive.

## Moduli MVP
- Login gestore
- Dashboard KPI
- Anagrafica clienti
- Scheda cliente e storico abbonamenti/pagamenti
- Piani di abbonamento configurabili
- Registrazione pagamenti
- Pannello scadenze 7/30 giorni
- Job automatico per aggiornamento stati e promemoria idempotenti

## Stack
React + Vite, Node.js + Express, MySQL/MariaDB + mysql2. La scelta del database è volutamente allineata al modello di produzione Hostinger già adottato per il progetto Lubrano, ma il repository e il dominio applicativo sono completamente separati.

## Multi-tenant
Il core usa tenant_id su tutte le entità di business. L'utente non sceglie mai il tenant da una richiesta: il tenant viene ricavato dalla sessione autenticata.

## Sviluppo
npm install → npm run dev

Per un ambiente MySQL configurato: npm run db:migrate e npm run db:bootstrap.

## Produzione
Vedi docs/DEPLOYMENT-HOSTINGER.md e docs/DATABASE.md.

**Non inserire dati reali degli iscritti nell'ambiente di sviluppo e non committare file .env.**
