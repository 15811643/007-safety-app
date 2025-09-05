import streamlit as st
from datetime import date
from lib.models import PreVisit
from lib.db import init_db, save_previsit, list_previsits

st.set_page_config(page_title="Workplace Pre-Visit", layout="wide")
init_db()

st.header("🏗️ Workplace Pre-Visit")

with st.form("previsit_form"):
    cols = st.columns(3)
    site = cols[0].text_input("Site/Location *")
    crew_size = cols[1].number_input("Crew size *", min_value=1, step=1, value=3)
    date_iso = cols[2].date_input("Date", value=date.today()).isoformat()

    c1, c2 = st.columns(2)
    confined_space = c1.toggle("Confined space involved?", value=False, help="If yes, an attendant is required.")
    attendant = c2.text_input("Confined Space Attendant", placeholder="Required if confined space = Yes")

    materials = st.text_area("Materials / Equipment (e.g., trench box, pumps, signage)")
    hazards = st.text_area("Known Hazards (e.g., overhead lines, traffic control, wildlife)")

    created_by = st.text_input("Recorded by", value="")

    submitted = st.form_submit_button("Save Pre-Visit", type="primary")

if submitted:
    try:
        model = PreVisit(
            site=site,
            crew_size=int(crew_size),
            confined_space=bool(confined_space),
            attendant=attendant or None,
            materials=materials or None,
            hazards=hazards or None,
            date_iso=date_iso,
            created_by=created_by or None,
        )
        pid = save_previsit(**model.model_dump())
        st.success(f"Saved Pre-Visit #{pid} for {model.site}.")
    except Exception as e:
        st.error(f"Validation failed: {e}")

st.subheader("Recent Pre-Visits")
rows = list_previsits(25)
if rows:
    st.dataframe([
        {
            "ID": r.id,
            "Site": r.site,
            "Date": r.date_iso,
            "Crew": r.crew_size,
            "Confined Space": "Yes" if r.confined_space else "No",
            "Attendant": r.attendant or "-",
        }
        for r in rows
    ], use_container_width=True)
else:
    st.info("No records yet. Create your first Pre-Visit above.")
