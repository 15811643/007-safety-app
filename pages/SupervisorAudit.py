import streamlit as st
from datetime import date

# Header
st.markdown(
    """
<div style="background: linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%); padding: 2rem; border-radius: 15px; color: white; text-align: center;">
  <h1>Supervisor Audit Tool</h1>
  <p>Remote Safety Audits &amp; Compliance Monitoring</p>
</div>
""",
    unsafe_allow_html=True,
)

# Access control
st.markdown("---")
st.markdown("## Form Access Control")
form_activated = st.checkbox("Activate Supervisor Audit", value=False)
if not form_activated:
    st.info("Form is locked — enable the checkbox to begin the audit")
    st.stop()

# Audit Information
st.markdown("## Audit Information")
col1, col2 = st.columns(2)
with col1:
    audit_number = st.text_input("Audit Number:")
    job_site = st.text_input("Job Site:")
    supervisor_name = st.text_input("Supervisor Name:")
    audit_date = st.date_input("Audit Date:", value=date.today())
with col2:
    audit_type = st.selectbox(
        "Audit Type:",
        ["Routine", "Incident Follow-up", "Compliance", "Pre-start", "Emergency"],
    )
    weather_conditions = st.selectbox("Weather Conditions:", ["Clear", "Rain", "Snow", "Fog", "Wind"])
    crew_size = st.number_input("Crew Size:", min_value=1, value=5, step=1)

st.markdown("## Audit Categories")

def category_block(title: str, key_prefix: str):
    st.markdown(f"### {title}")
    col1, col2 = st.columns(2)
    with col1:
        status = st.selectbox(
            f"{title} Status:",
            ["Satisfactory", "Needs Attention", "Stop Work — Contact Supervision"],
            key=f"{key_prefix}_status",
        )
    with col2:
        comments = st.text_area(f"{title} Comments:", height=80, key=f"{key_prefix}_comments")
    if status.startswith("Stop Work"):
        st.warning(f"STOP WORK ORDER: {title} issue requires immediate supervisor contact.")

category_block("Safety Equipment & PPE", "ppe")
category_block("Work Practices", "work")
category_block("Site Conditions", "site")
category_block("Equipment & Machinery", "equip")

st.success("Audit captured (local session)")

