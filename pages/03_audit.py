import streamlit as st
import json
from datetime import date
from lib.db import init_db, save_audit, list_audits, add_action

st.set_page_config(page_title="Audit", layout="wide")
init_db()

st.header("Safety Audit (Quick Checklist)")

DEFAULT_ITEMS = [
    "Housekeeping acceptable",
    "Barricades/signage in place",
    "PPE worn and suitable",
    "Ladders/scaffolds inspected",
    "Trench/Excavation protected",
    "Overhead hazards controlled",
    "Confined space controls active",
]

with st.form("audit_form"):
    c1, c2, c3 = st.columns(3)
    site = c1.text_input("Site *")
    auditor = c2.text_input("Auditor")
    date_iso = c3.date_input("Date", value=date.today()).isoformat()

    st.markdown("**Checklist** — mark Pass/Fail and add comments if needed")
    data = []
    for i, item in enumerate(DEFAULT_ITEMS, start=1):
        cc1, cc2, cc3 = st.columns([2, 1, 2])
        cc1.write(item)
        res = cc2.selectbox("Result", ["Pass", "Fail", "N/A"], key=f"res_{i}")
        com = cc3.text_input("Comment", key=f"com_{i}")
        data.append({"item": item, "result": res, "comment": com})

    findings = st.text_area("Findings / Notes")
    raise_actions = st.toggle(
        "Create action items for any FAIL results", value=True
    )

    submitted = st.form_submit_button("Save Audit", type="primary")

if submitted:
    actions_raised = 0
    if raise_actions:
        for row in data:
            if row["result"] == "Fail":
                add_action(
                    source="Audit",
                    source_id=0,
                    site=site,
                    title=f"Fix: {row['item']}",
                )
                actions_raised += 1

    aid = save_audit(
        site=site,
        auditor=auditor or None,
        date_iso=date_iso,
        checklist=json.dumps(data),
        findings=findings or None,
        actions_raised=actions_raised,
    )
    st.success(f"Saved Audit #{aid} for {site}. Actions raised: {actions_raised}")

st.subheader("Recent Audits")
rows = list_audits(50)
if rows:
    st.dataframe(
        [
            {
                "ID": r.id,
                "Site": r.site,
                "Date": r.date_iso,
                "Actions Raised": r.actions_raised,
            }
            for r in rows
        ],
        use_container_width=True,
    )
else:
    st.info("No audits yet — create one above.")

