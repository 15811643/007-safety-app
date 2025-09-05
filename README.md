# Safety Management Applications

This repository contains two complementary safety management applications:

## 🚀 React Safety Management App

A comprehensive safety management application built with React and Vite.

### Features
- **Safety Dashboard** - Real-time KPI monitoring and analytics
- **Incident Reporting** - Comprehensive incident tracking and management
- **Compliance Training** - Interactive safety checklists and training modules
- **Emergency Response** - Emergency alerts and contact management
- **Real-time Monitoring** - Live safety data and predictive insights
- **User Management** - Role-based access control and user profiles

### Quick Start
```bash
npm install
npm run dev
npm run build
```

### Live Demo
Visit: https://web-based-safety-app-tartan1000.vercel.app

---

## 🤖 007 Safety Inspection Assistant

**007** is an AI-powered Streamlit application for safety inspection analysis.

### Features
- Upload and analyze inspection CSVs
- GPT-5 summaries of findings
- Interactive dashboard with hazard trends
- Memory archive and report viewer

### Setup
1. Clone the repo to `Desktop\msa`
2. Run `setup\install.ps1` to install environment and dependencies
3. Run `setup\start.ps1` to launch the app

### Folders
- `data/`: Uploaded files
- `memory/`: AI summaries
- `reports/`: Output reports

### API Key
Set your OpenAI key in the terminal:
```powershell
$env:OPENAI_API_KEY = "your-key-here"
```
Then run the app.

### Deploy to Streamlit
✅ Deploy to [https://share.streamlit.io](https://share.streamlit.io)
- Use `app/app.py` as entrypoint
- Add your `OPENAI_API_KEY` as secret

---

## Recent Updates

- Fixed Vercel deployment issues with Rollup dependencies
- Added auto-login for immediate access to all features
- Implemented comprehensive safety management modules
- Added real-time monitoring and emergency response features
- Updated build command to exclude optional dependencies
- Merged Python Streamlit safety inspection app

*Last updated: $(Get-Date)*
