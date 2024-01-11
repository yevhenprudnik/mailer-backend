PGPASSWORD=postgres psql -f db.sql -U postgres -p 5432 -h localhost
PGPASSWORD=postgres psql -d mailer -f tables.sql -U postgres -p 5432 -h localhost