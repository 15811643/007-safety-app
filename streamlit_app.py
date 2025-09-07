import os
import streamlit as st
from dotenv import load_dotenv

st.set_page_config(page_title="007 Safety", layout="wide")
load_dotenv()

st.title("007 Safety | Home")

st.write(
    """
    Welcome to the 007 Safety app. Use the sidebar to navigate.
    This scaffold includes:
    - Workplace Pre-Visit (with validation & DB save)
    - Reports (export HTML/PDF)
    - Scheduling (P6-lite with Gantt)
    - Data layer based on SQLModel (SQLite)
    - GPT-4 integration for safety insights
    """
)

with st.sidebar:
    st.page_link("pages/01_previsit.py", label="Workplace Pre-Visit")
    st.page_link("pages/02_risk.py", label="Risk Assessment")
    st.page_link("pages/03_audit.py", label="Safety Audit")
    st.page_link("pages/02_inspection.py", label="Safety Inspection")
    st.page_link("pages/InspectionForm.py", label="Safety Inspection Form")
    st.page_link("pages/PreVisit.py", label="Pre-Visit Assessment")
    st.page_link("pages/SupervisorAudit.py", label="Supervisor Audit")
    st.page_link("pages/Dashboard.py", label="Safety Dashboard")
    st.page_link("pages/Reports.py", label="Reports")
    st.page_link("pages/Upload.py", label="Upload Data")
    st.page_link("pages/Memory.py", label="Memory Archive")
    st.page_link("pages/FallsPrevention.py", label="Falls Prevention")
    st.page_link("pages/08_schedule.py", label="Scheduling (P6-lite)")
    st.page_link("pages/10_reports.py", label="Reports & Exports")

# Simple KPI surface on Home (optional)
st.subheader("KPI Snapshot")
c1, c2, c3, c4 = st.columns(4)

# Try to pull basic KPIs from the local SQLite DB
open_actions = high_risks_30d = repeat_hazards_90d = audits_this_month = 0
try:
    from lib.db import list_actions, list_risks, list_audits
    from datetime import datetime, timedelta

    actions = list_actions(status="Open", limit=500)
    open_actions = len(actions)

    now = datetime.utcnow()
    days30 = now - timedelta(days=30)
    risks = list_risks(limit=500)
    def parsed(dt: str):
        try:
            return datetime.fromisoformat(dt.replace("Z", "+00:00"))
        except Exception:
            return now
    high_risks_30d = sum(1 for r in risks if r.rating >= 12 and parsed(getattr(r, 'created_at', now.isoformat())) >= days30)

    days90 = now - timedelta(days=90)
    # naive repeat hazard heuristic: same hazard text appears >= 2 times in last 90d
    from collections import Counter
    hz = [r.hazard for r in risks if parsed(getattr(r, 'created_at', now.isoformat())) >= days90]
    repeat_hazards_90d = sum(1 for _, cnt in Counter(hz).items() if cnt >= 2)

    audits = list_audits(limit=500)
    this_month = now.strftime('%Y-%m')
    audits_this_month = sum(1 for a in audits if getattr(a, 'date_iso', '').startswith(this_month))
except Exception:
    pass

c1.metric("Open Actions", open_actions)
c2.metric("High Risks (30d)", high_risks_30d)
c3.metric("Repeat Hazards (90d)", repeat_hazards_90d)
c4.metric("Audits This Month", audits_this_month)
st.info(
    "KPIs will show real data once you start using the Risk Assessment and Audit modules."
)

st.success("Starter loaded. Use the sidebar to explore modules.")

# Test GPT integration
if st.button("Test GPT Integration"):
    from lib.gpt_wrapper import ask_gpt

    response = ask_gpt(
        "What are the top 3 safety considerations for construction sites?"
    )
    st.write("GPT Response:", response)

if st.button("Test Perplexity (Web)"):
    from lib.pplx_wrapper import ask_pplx

    response = ask_pplx(
        "Summarize 3 recent safety regulation updates relevant to construction sites in North America."
    )
    st.write("Perplexity Response:", response)
