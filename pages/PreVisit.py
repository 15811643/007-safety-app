import streamlit as st
from datetime import date

# Header
st.markdown(
    """
<div style="background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 15px; color: white; text-align: center;">
  <h1>Workplace Pre-Visit Assessment</h1>
  <p>Site Survey & Job Preparation</p>
</div>
""",
    unsafe_allow_html=True,
)

st.markdown("---")
st.markdown("## Job Information")
col1, col2 = st.columns(2)
with col1:
    job_number = st.text_input("Job Number:")
    client_name = st.text_input("Client Name:")
    site_address = st.text_area("Site Address:", height=80)
    surveyor_name = st.text_input("Surveyor Name:")
with col2:
    visit_date = st.date_input("Visit Date:", value=date.today())
    weather_conditions = st.selectbox(
        "Weather Conditions:",
        [
            "Clear",
            "Rain",
            "Snow",
            "Fog",
            "Wind",
            "Extreme Heat",
            "Extreme Cold",
        ],
    )
    site_conditions = st.selectbox(
        "Site Conditions:", ["Dry", "Wet", "Muddy", "Icy", "Snow covered"]
    )
    access_restrictions = st.text_area("Access Restrictions:", height=80)

st.markdown("## Permit Requirements")
col1, col2 = st.columns(2)
with col1:
    st.subheader("Excavation Permits")
    municipal_permit = st.checkbox("Municipal excavation permit")
    utility_locates = st.checkbox("Utility locates completed")
    traffic_control = st.checkbox("Traffic control permit")
    environmental = st.checkbox("Environmental assessment")
    st.subheader("Specialized Permits")
    rotary = st.checkbox("Rotary drill permit")
    confined = st.checkbox("Confined space entry permit")
    hot_work = st.checkbox("Hot work permit")
    heights = st.checkbox("Working at heights permit")
with col2:
    st.subheader("Permit Status")
    permit_status = st.selectbox(
        "Overall Permit Status:", ["Pending", "In Progress", "Approved", "Rejected"]
    )
    permit_notes = st.text_area("Permit Notes:", height=100)
    if permit_status == "Pending":
        st.warning("Permits pending - work cannot proceed")

st.markdown("## Utility Conflicts")
col1, col2 = st.columns(2)
with col1:
    st.subheader("Overhead Utilities")
    over_power = st.checkbox("Overhead power lines")
    over_tel = st.checkbox("Telephone/cable lines")
    over_lights = st.checkbox("Street lights")
    over_signals = st.checkbox("Traffic signals")
    if over_power:
        st.selectbox("Power line voltage:", ["Low", "Medium", "High"])
        st.number_input("Required clearance (m):", min_value=0.0, value=3.0, step=0.1)
with col2:
    st.subheader("Underground Utilities")
    st.checkbox("Natural gas lines")
    st.checkbox("Water mains")
    st.checkbox("Sewer lines")
    st.checkbox("Telecommunications cables")
    st.checkbox("Underground electrical")
    st.selectbox("Utility markings present:", ["None", "Partial", "Complete"])
    st.date_input("Marking date:", value=date.today())

st.success("Pre-visit captured (local session)")

