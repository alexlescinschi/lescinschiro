#!/bin/sh
# ponytail: run payload migration before starting
echo "⏳ Waiting for DB..."
until node -e "require('net').connect({host:'db',port:5432},()=>process.exit(0))" 2>/dev/null; do sleep 1; done
echo "✅ DB ready"

echo "🚀 Running Payload migrations..."
cd /app && npx payload migrate 2>&1 || echo "⚠️ Migration failed — continuing anyway"

echo "▶️ Starting app..."
exec node server.js
