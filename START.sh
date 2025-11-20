#!/bin/bash

echo "🌸 Starting Mindful Mind Application..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✨ Starting development servers..."
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""

npm run dev
