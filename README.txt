ANC MIRA - PWA SUPABASE CONFIGURATA

Questa versione è già configurata per il progetto Supabase ANC Mira.
Project URL: https://gpyifykpipwjaxujvsxl.supabase.co

La PWA usa una Supabase Publishable Key nel browser, come previsto dalla documentazione Supabase. La sicurezza dei dati dipende da RLS e dalle policy del database.

PRIMA DEL PRIMO ACCESSO
1. Eseguire nel SQL Editor di Supabase il file ANC_Mira_Supabase_Database.sql (se non è già stato eseguito).
2. Registrare il primo utente dalla schermata "Prima registrazione".
3. Dopo la registrazione, nel SQL Editor promuovere il primo amministratore:
   UPDATE public.profiles SET ruolo='admin', attivo=true WHERE email='LA_TUA_EMAIL';
4. Se la conferma email è attiva in Supabase Auth, confermare l'email prima del login.

GITHUB KEEPALIVE
La cartella .github/workflows contiene l'Action di keepalive. Per il job server-side usare un secret Supabase Secret Key (o la vecchia service_role, se il progetto la usa ancora) SOLO nei GitHub Repository Secrets. Non inserirlo mai nella PWA.
Secrets richiesti dall'Action:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (nome storico usato dal workflow; può essere sostituito con una secret key aggiornata modificando il workflow)

SICUREZZA
- La Publishable Key può essere presente nel codice client.
- Secret Key / service_role non devono mai essere pubblicate.
- Le policy RLS del database devono restare attive.

Nota: il keepalive ogni 4 giorni non garantisce da solo che un progetto Free non venga messo in pausa; la policy di inattività di Supabase può cambiare.
