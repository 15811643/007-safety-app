import os
import streamlit as st
from dotenv import load_dotenv

st.set_page_config(page_title="007 Safety", layout="wide")
load_dotenv()

st.title("🛡️ 007 Safety — Home")

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
    st.page_link("pages/01_previsit.py", label="🏗️ Workplace Pre-Visit")
    st.page_link("pages/02_risk.py", label="🎯 Risk Assessment")
    st.page_link("pages/03_audit.py", label="🔍 Safety Audit")
    st.page_link("pages/02_inspection.py", label="📋 Safety Inspection")
    st.page_link("pages/InspectionForm.py", label="📋 Safety Inspection Form")
    st.page_link("pages/PreVisit.py", label="🏗️ Pre-Visit Assessment")
    st.page_link("pages/SupervisorAudit.py", label="👨‍💼 Supervisor Audit")
    st.page_link("pages/Dashboard.py", label="📊 Safety Dashboard")
    st.page_link("pages/Reports.py", label="📋 Reports")
    st.page_link("pages/Upload.py", label="📤 Upload Data")
    st.page_link("pages/Memory.py", label="💾 Memory Archive")
    st.page_link("pages/FallsPrevention.py", label="🛡️ Falls Prevention")
    st.page_link("pages/08_schedule.py", label="📅 Scheduling (P6-lite)")
    st.page_link("pages/10_reports.py", label="📊 Reports & Exports")

# Simple KPI surface on Home (optional)
try:
    from lib.analytics import kpi_summary
    from lib.db import init_db
    init_db()  # Ensure database is initialized
    kpis = kpi_summary()
    st.subheader("📊 KPI Snapshot")
    c1,c2,c3,c4 = st.columns(4)
    c1.metric("Open Actions", kpis.get("open_actions", 0))
    c2.metric("High Risks (30d)", kpis.get("high_risks_30d", 0))
    c3.metric("Repeat Hazards (90d)", kpis.get("repeat_hazards_90d", 0))
    c4.metric("Audits This Month", kpis.get("audits_month", 0))
except Exception as e:
    st.info("KPIs will appear once risk/audit data is entered.")
    # Uncomment for debugging: st.error(f"KPI Error: {e}")

st.success("Starter loaded. Use the sidebar to explore modules.")

# Test GPT integration
if st.button("Test GPT Integration"):
    from lib.gpt_wrapper import ask_gpt
    response = ask_gpt("What are the top 3 safety considerations for construction sites?")
    st.write("GPT Response:", response)
