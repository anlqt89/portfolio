#!/bin/bash
cd "$(dirname "$0")"

# Activate virtual environment
source venv/bin/activate

# Load .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Starting backend..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
