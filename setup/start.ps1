# Activate virtual environment
.\.venv\Scripts\Activate.ps1

# Load environment variables from .env file
Write-Host "🛡️ Starting 007 Safety Inspection Assistant..." -ForegroundColor Green
Write-Host "📋 Loading API key from .env file..." -ForegroundColor Yellow

# Start Streamlit app
streamlit run app/app.py