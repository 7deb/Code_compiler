#!/bin/bash
set -e

DB_HOST="db"

echo "Waiting for PostgreSQL database to start on $DB_HOST:5432..."

while ! nc -z $DB_HOST 5432; do
  sleep 1
done

echo "PostgreSQL started. Running Prisma migrations..."

npx prisma migrate deploy

exec "$@"
