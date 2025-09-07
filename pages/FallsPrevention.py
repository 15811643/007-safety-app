import streamlit as st
from datetime import date, datetime
import json
import os

# Header
st.markdown(
    """
<div style="background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%); padding: 2rem; border-radius: 15px; color: white; text-align: center;">
  <h1>Falls Prevention &amp; Protection</h1>
  <p>IHSA Standards &amp; Ontario Construction Safety</p>
</div>
""",
    unsafe_allow_html=True,
)

st.markdown("---")
st.markdown("## Activate Assessment")
form_activated = st.checkbox(
    "Activate Falls Prevention Assessment", value=False
)
if not form_activated:
    st.info("Form is locked — enable the checkbox to begin the falls prevention assessment")
    st.stop()

# Work Information
st.markdown("## Work Information")
col1, col2 = st.columns(2)
with col1:
    work_location = st.text_input("Work Location:")
    work_description = st.text_area("Work Description:", height=80)
    supervisor_name = st.text_input("Supervisor Name:")
    work_date = st.date_input("Work Date:", value=date.today())
with col2:
    work_height = st.number_input("Work Height (m):", min_value=0.0, value=3.0, step=0.5)
    weather_conditions = st.selectbox(
        "Weather Conditions:",
        ["Clear", "Rain", "Snow", "Wind", "Fog", "Extreme Heat", "Extreme Cold"],
    )
    wind_speed = st.number_input("Wind Speed (km/h):", min_value=0, value=10, step=5)
    visibility = st.selectbox("Visibility:", ["Good", "Fair", "Poor"])

if work_height > 3.0:
    st.warning(
        "FALL PROTECTION REQUIRED: Work height exceeds 3 meters. Fall protection systems must be in place."
    )

# Protection Systems
st.markdown("## Fall Protection Systems")
col1, col2 = st.columns(2)
with col1:
    guardrail_systems = {
        "Guardrails installed": st.checkbox("Guardrails installed on all open sides"),
        "Toe boards": st.checkbox("Toe boards in place"),
        "Mid-rails": st.checkbox("Mid-rails installed"),
    }
    safety_nets = {
        "Safety nets": st.checkbox("Safety nets installed (where applicable)"),
        "Inspected": st.checkbox("Safety nets inspected and tagged"),
    }
with col2:
    personal_protection = {
        "Full body harness": st.checkbox("Full body harness worn"),
        "Lanyard & SRL": st.checkbox("Lanyard/SRL in use"),
        "Anchorage rated": st.checkbox("Anchorage points rated and verified"),
    }
    travel_restraint = {
        "Travel restraint": st.checkbox("Travel restraint system in use"),
        "Edges marked": st.checkbox("Edges and openings marked"),
    }

# Access Equipment
st.markdown("## Equipment & Access")
col1, col2 = st.columns(2)
with col1:
    st.subheader("Ladders")
    ladder_safety = {
        "Inspection current": st.checkbox("Ladders inspected and serviceable"),
        "Secure setup": st.checkbox("Ladders secured and angle correct"),
        "Extends above": st.checkbox("Extends 1m above landing"),
    }
    ladder_type = st.selectbox("Ladder Type:", ["Extension", "Step", "Fixed", "Portable", "Other"])
    ladder_length = st.number_input("Ladder Length (m):", min_value=1.0, value=6.0, step=0.5)
with col2:
    st.subheader("Scaffolds")
    scaffold_safety = {
        "Certified & tagged": st.checkbox("Scaffold certified and tagged"),
        "Guardrails": st.checkbox("Guardrails installed on all open sides"),
        "Access ladder": st.checkbox("Safe access ladder provided"),
    }
    scaffold_height = st.number_input("Scaffold Height (m):", min_value=0.0, value=5.0, step=0.5)
    scaffold_type = st.selectbox("Scaffold Type:", ["Frame", "Tube & Clamp", "System", "Suspended", "Other"])

# Work Area Assessment
st.markdown("## Work Area Assessment")
col1, col2 = st.columns(2)
with col1:
    st.subheader("Surface Conditions")
    surface_conditions = {
        "Stable surface": st.checkbox("Working surface is stable"),
        "No holes": st.checkbox("No holes or openings"),
        "Drainage": st.checkbox("Proper drainage"),
    }
    st.subheader("Overhead Hazards")
    overhead_hazards = {
        "Power lines": st.checkbox("Overhead power lines identified"),
        "Clearance": st.checkbox("Safe clearance maintained"),
        "Falling objects": st.checkbox("Protection from falling objects"),
    }
with col2:
    st.subheader("Environmental Factors")
    environmental_factors = {
        "Wind assessed": st.checkbox("Wind conditions assessed"),
        "Lighting": st.checkbox("Adequate lighting"),
        "Air quality": st.checkbox("Air quality suitable"),
    }
    st.subheader("Emergency Access")
    emergency_access = {
        "Plan in place": st.checkbox("Emergency plan in place"),
        "Rescue equipment": st.checkbox("Rescue equipment available"),
        "First aid": st.checkbox("First aid accessible"),
    }

# Training & Competency
st.markdown("## Training & Competency")
col1, col2 = st.columns(2)
with col1:
    training_requirements = {
        "Working at heights": st.checkbox("Working at heights training completed"),
        "Fall protection": st.checkbox("Fall protection training completed"),
        "Equipment specific": st.checkbox("Equipment-specific training"),
    }
    training_date = st.date_input("Last Training Date:", value=date.today())
    training_provider = st.text_input("Training Provider:")
with col2:
    competency_assessment = {
        "Practical assessment": st.checkbox("Practical assessment completed"),
        "Written test": st.checkbox("Written test passed"),
        "Emergency procedures": st.checkbox("Knows emergency procedures"),
    }
    assessment_date = st.date_input("Competency Assessment Date:", value=date.today())
    assessor_name = st.text_input("Assessor Name:")

# Pre-Work Checklist
st.markdown("## Pre-Work Checklist")
pre_work_checks = {
    "Toolbox talk": st.checkbox("Toolbox talk completed"),
    "Equipment inspected": st.checkbox("All equipment inspected"),
    "Weather check": st.checkbox("Weather conditions acceptable"),
    "Communication": st.checkbox("Communication system tested"),
    "Emergency plan": st.checkbox("Emergency plan reviewed"),
    "PPE verified": st.checkbox("All PPE verified and worn"),
}

# Risk Assessment
st.markdown("## Risk Assessment")
risk_level = st.selectbox("Overall Risk Level:", ["Low", "Medium", "High", "Critical"])
additional_comments = st.text_area("Additional Comments:", height=80)
recommendations = st.text_area("Safety Recommendations:", height=80)

if risk_level in ["High", "Critical"]:
    st.warning(
        "HIGH RISK WORK: Additional controls required. Work cannot proceed without supervisor approval."
    )

# Save / View / Export
st.markdown("---")
col1, col2, col3 = st.columns(3)

if "falls_data" not in st.session_state:
    st.session_state.falls_data = {}

with col1:
    if st.button("Save Assessment", use_container_width=True):
        st.session_state.falls_data = {
            "work_info": {
                "work_location": work_location,
                "work_description": work_description,
                "supervisor_name": supervisor_name,
                "work_date": str(work_date),
                "work_height": work_height,
                "weather_conditions": weather_conditions,
                "wind_speed": wind_speed,
                "visibility": visibility,
            },
            "fall_protection": {
                "guardrail_systems": guardrail_systems,
                "safety_nets": safety_nets,
                "personal_protection": personal_protection,
                "travel_restraint": travel_restraint,
            },
            "equipment_access": {
                "ladder_safety": ladder_safety,
                "ladder_type": ladder_type,
                "ladder_length": ladder_length,
                "scaffold_safety": scaffold_safety,
                "scaffold_height": scaffold_height,
                "scaffold_type": scaffold_type,
            },
            "work_area": {
                "surface_conditions": surface_conditions,
                "overhead_hazards": overhead_hazards,
                "environmental_factors": environmental_factors,
                "emergency_access": emergency_access,
            },
            "training_competency": {
                "training_requirements": training_requirements,
                "training_date": str(training_date),
                "training_provider": training_provider,
                "competency_assessment": competency_assessment,
                "assessment_date": str(assessment_date),
                "assessor_name": assessor_name,
            },
            "pre_work_checks": pre_work_checks,
            "risk_assessment": {
                "risk_level": risk_level,
                "additional_comments": additional_comments,
                "recommendations": recommendations,
            },
            "timestamp": datetime.now().isoformat(),
        }
        st.success("Falls prevention assessment saved (session)")

with col2:
    if st.button("View Assessment", use_container_width=True):
        st.json(st.session_state.falls_data)

with col3:
    if st.button("Export Report", use_container_width=True):
        os.makedirs("falls_prevention", exist_ok=True)
        filename = f"falls_prevention/falls_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, "w", encoding="utf-8") as f:
            json.dump({"date": datetime.now().isoformat(), "data": st.session_state.falls_data}, f, indent=2)
        st.success(f"Falls prevention report exported to {filename}")

# Summary
st.markdown("---")
st.markdown("## Assessment Summary")
if st.session_state.falls_data:
    data = st.session_state.falls_data
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Work Height", f"{data.get('work_info', {}).get('work_height', 0)} m")
    with col2:
        st.metric(
            "Risk Level",
            data.get("risk_assessment", {}).get("risk_level", "Unknown"),
        )
    with col3:
        protection_count = sum(data.get("fall_protection", {}).get("guardrail_systems", {}).values()) + sum(
            data.get("fall_protection", {}).get("personal_protection", {}).values()
        )
        st.metric("Protection Systems", protection_count)
    with col4:
        checks_completed = sum(data.get("pre_work_checks", {}).values())
        st.metric("Checks Completed", str(checks_completed))

