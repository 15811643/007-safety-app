import streamlit as st
from datetime import date
from lib.db import init_db, save_risk, list_risks, add_action
from lib.analytics import repeat_hazards

st.set_page_config(page_title="Risk Assessment", layout="wide")
init_db()

st.header("🎯 Risk Assessment")

with st.form("risk_form"):
    c1, c2, c3 = st.columns(3)
    site = c1.text_input("Site/Location *")
    hazard = c2.text_input("Hazard *", placeholder="e.g., Overhead lines, Trench collapse")
    category = c3.selectbox("Category", ["Electrical", "Excavation", "Heights", "Traffic", "Mechanical", "Chemical", "Environmental", "Other"], index=0)

    c4, c5, c6 = st.columns(3)
    severity = c4.slider("Severity (1–5)", 1, 5, 3)
    likelihood = c5.slider("Likelihood (1–5)", 1, 5, 3)
    rating = severity * likelihood
    c6.metric("Risk Rating", rating)

    controls = st.text_area("Controls / Mitigations", placeholder="e.g., spotter, isolation, trench box, harness")

    c7, c8, c9 = st.columns(3)
    responsible = c7.text_input("Responsible (owner)")
    due_date = c8.date_input("Action due date", value=date.today()).isoformat()
    status = c9.selectbox("Status", ["Open", "Closed"], index=0)

    note = st.text_area("Notes (optional)")

    submitted = st.form_submit_button("Save Risk", type="primary")

if submitted:
    rid = save_risk(
        site=site, hazard=hazard, category=category,
        severity=severity, likelihood=likelihood, rating=rating,
        controls=controls or None, responsible=responsible or None,
        due_date=due_date, status=status, note=note or None,
    )
    st.success(f"Saved Risk #{rid} ({hazard}) with rating {rating}.")
    if responsible:
        add_action(source="Risk", source_id=rid, site=site, title=f"Mitigate: {hazard}", owner=responsible, due_date=due_date)

st.subheader("🚨 Repeat Hazards (Auto-Flag)")
flags = repeat_hazards()
if flags:
    st.warning("These hazards repeat at/within 90 days (threshold ≥3):")
    st.dataframe(flags, use_container_width=True)
else:
    st.info("No repeat hazards flagged yet.")

st.subheader("📊 Recent Risks")
rows = list_risks(200)
if rows:
    st.dataframe([
        {
            "ID": r.id,
            "Site": r.site,
            "Hazard": r.hazard,
            "Cat": r.category,
            "Rating": r.rating,
            "Status": r.status,
            "Due": r.due_date or "-",
            "Owner": r.responsible or "-",
        }
        for r in rows
    ], use_container_width=True)
else:
    st.info("No risk records yet.")
