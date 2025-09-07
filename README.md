# 007 Safety App

This repo contains:
- A React + Vite frontend (web-based safety UI)
- A Streamlit safety inspection app with optional LLM integrations

## Quick Start

React (Vite):
- `cd 007-safety-app`
- `npm install`
- `npm run dev`

Streamlit:
- `cd 007-safety-app`
- `pip install -r requirements.txt`
- Copy `.env.example` to `.env` and set keys
- `streamlit run streamlit_app.py`

## LLM Setup

Both OpenAI and Perplexity Pro are supported via simple wrappers.

Environment variables (in `.env`):
- `OPENAI_API_KEY` (required for OpenAI)
- `OPENAI_MODEL` (default: `gpt-4o-mini`)
- `PPLX_API_KEY` (required for Perplexity Pro)
- `PPLX_MODEL` (default: `llama-3.1-sonar-small-128k-online`)

Usage:
- OpenAI: `lib/gpt_wrapper.py` exposes `ask_gpt(prompt)`
- Perplexity: `lib/pplx_wrapper.py` exposes `ask_pplx(prompt)`

The Streamlit home adds test buttons for both providers.

## Structure

- `src/` React source
- `pages/` Streamlit pages
- `lib/` Shared Python utilities (DB, reports, scheduling, LLM wrappers)
- `public/` Static assets (React)

## Notes

- Node `>=18` required for the React app.
- Python dependencies are listed in `requirements.txt`.
- To export PDFs in Reports, install WeasyPrint locally or download HTML and print to PDF.

