# Hostinger — setup manuale per Perfect Line

Questa checklist riguarda solo la prima configurazione della produzione. Non inserire password o dati personali in GitHub.

## 1. Database MySQL
In hPanel: Websites → Dashboard del sito → Databases → Management. Crea un nuovo database MySQL e il relativo utente dedicato. Hostinger assegna il database al sito selezionato; il database hostname, per l'applicazione sullo stesso hosting, è `localhost`.

Nome consigliato: `perfect_line` (Hostinger aggiungerà automaticamente il prefisso dell'account).
Utente consigliato: `perfect_line_app` (con prefisso Hostinger).

Conserva:
- MYSQL_HOST = localhost
- MYSQL_PORT = 3306
- MYSQL_DATABASE = nome completo mostrato da Hostinger
- MYSQL_USER = nome completo mostrato da Hostinger
- MYSQL_PASSWORD = password creata

## 2. Node.js Web App
Crea una nuova Node.js Web App e collega il repository GitHub:
Sannino1999/perfect-line-gestionale

Branch: `main`

Imposta Node.js 22.
Build command: `npm run build`
Start command: `npm start`

## 3. Environment variables
Configura nella Web App:
APP_URL = URL HTTPS definitivo del gestionale
COOKIE_SECURE = true
MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_DATABASE = ...
MYSQL_USER = ...
MYSQL_PASSWORD = ...

Per il bootstrap iniziale usa temporaneamente anche:
ADMIN_EMAIL = email del gestore
ADMIN_PASSWORD = password forte e unica

Dopo aver creato il primo account, rimuovi ADMIN_PASSWORD dall'ambiente di produzione se non serve più.

## 4. Database migration
Esegui una volta:
`npm run db:migrate`

Poi:
`npm run db:bootstrap`

La migration crea schema e tabelle; il bootstrap crea il tenant Perfect Line, il proprietario e i piani iniziali demo. Prima di usare dati reali sostituire i piani/prezzi con quelli concordati con la palestra.

## 5. Cron scadenze
Dopo che l'app risponde correttamente, crea un Custom Cron Job giornaliero:
`node /percorso/assoluto/dell/app/scripts/expire-memberships.mjs`

Usa un orario mattutino. Hostinger esegue i Cron in UTC.

## 6. Smoke test
Verificare:
- /api/health restituisce status ok
- login/logout
- creazione cliente
- modifica cliente
- nuovo abbonamento
- pagamento
- rinnovo
- insoluti
- scadenze
- export cliente
- archiviazione cliente

Non iniziare con dati reali finché backup e restore non sono stati verificati.
