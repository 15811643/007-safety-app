import streamlit as st
from datetime import date

# Header
st.markdown(
    """
<div style="background: linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%); padding: 2rem; border-radius: 15px; color: white; text-align: center;">
  <h1>Safety Inspection Form</h1>
  <p>Comprehensive Safety Compliance</p>
</div>
""",
    unsafe_allow_html=True,
)

# Access control
st.markdown("---")
st.markdown("## Form Access Control")
form_activated = st.checkbox(
    "Activate Safety Inspection Form", value=False
)
if not form_activated:
    st.info("Form is locked — enable the checkbox to begin the inspection")
    st.stop()

sections = [
    "Traffic Control Plan",
    "Trenching Safety Plan",
    "Overhead Hazards",
    "Lifting Plan",
    "Permit to Work",
    "Working at Heights",
]

st.sidebar.markdown("## Inspection Sections")
selected_section = st.sidebar.selectbox("Select Section:", sections)

st.markdown(
    f"""
<div style="background: linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 1rem; border-radius: 8px; text-align: center; font-weight: bold;">
  {selected_section}
</div>
""",
    unsafe_allow_html=True,
)

if selected_section == "Traffic Control Plan":
    c1, c2 = st.columns(2)
    with c1:
        st.subheader("Traffic Control Equipment")
        st.checkbox("Traffic barrels/cones available")
        st.checkbox("Warning signs posted")
        st.checkbox("Flag person assigned")
        st.checkbox("Barricades installed")
        st.checkbox("Flashing lights operational")
    with c2:
        st.subheader("Traffic Plan Elements")
        st.checkbox("Traffic control plan reviewed")
        st.checkbox("Speed limits posted")
        st.checkbox("Detour routes established")
        st.checkbox("Emergency access maintained")
        st.text_area("Comments", height=100)

elif selected_section == "Trenching Safety Plan":
    c1, c2 = st.columns(2)
    with c1:
        st.subheader("Protection Systems")
        st.checkbox("Shoring/Shielding installed")
        st.checkbox("Sloping/Benching as per soil type")
        st.checkbox("Safe access/egress provided")
        st.checkbox("Spoil piles set back")
    with c2:
        st.subheader("Site Conditions")
        st.selectbox("Soil Type", ["Stable", "Type A", "Type B", "Type C"]) 
        st.selectbox("Water presence", ["None", "Seepage", "Standing water"]) 
        st.text_area("Comments", height=100)

elif selected_section == "Overhead Hazards":
    c1, c2 = st.columns(2)
    with c1:
        st.subheader("Identification")
        st.checkbox("Overhead power lines present")
        st.checkbox("Cranes/booms near lines")
        st.checkbox("Fall of materials protection")
    with c2:
        st.subheader("Controls")
        st.checkbox("Clearance verified")
        st.checkbox("Spotter assigned")
        st.checkbox("Barricades/signage in place")
        st.text_area("Comments", height=100)

elif selected_section == "Lifting Plan":
    c1, c2 = st.columns(2)
    with c1:
        st.subheader("Equipment")
        st.checkbox("Inspection current")
        st.checkbox("Load chart available")
        st.checkbox("Rigging inspected")
    with c2:
        st.subheader("Operations")
        st.checkbox("Exclusion zone established")
        st.checkbox("Communication plan in place")
        st.checkbox("Ground conditions assessed")
        st.text_area("Comments", height=100)

elif selected_section == "Permit to Work":
    c1, c2 = st.columns(2)
    with c1:
        st.subheader("Permits")
        st.checkbox("Hot work permit")
        st.checkbox("Confined space entry")
        st.checkbox("Lockout/Tagout")
    with c2:
        st.subheader("Authorization")
        st.date_input("Permit date", value=date.today())
        st.text_input("Authorized by")
        st.text_area("Notes", height=80)

elif selected_section == "Working at Heights":
    c1, c2 = st.columns(2)
    with c1:
        st.subheader("Protection Systems")
        st.checkbox("Guardrails installed")
        st.checkbox("Fall arrest in use")
        st.checkbox("Travel restraint in place")
    with c2:
        st.subheader("Training")
        st.checkbox("Working at heights training")
        st.checkbox("Equipment-specific training")
        st.text_area("Comments", height=80)

st.success("Section saved (local session)")

