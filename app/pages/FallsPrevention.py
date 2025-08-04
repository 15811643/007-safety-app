import streamlit as st
import json
import os
from datetime import datetime

# Custom CSS for modern styling
st.markdown("""
<style>
    .falls-header {
        background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }
    .form-section {
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        border-left: 4px solid #e74c3c;
    }
    .form-section h3 {
        color: white;
        margin-bottom: 1rem;
    }
    .critical-warning {
        background: #e74c3c;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border: 2px solid #c0392b;
        font-weight: bold;
    }
    .section-title {
        background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .stButton > button {
        background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 0.5rem 2rem;
        font-weight: bold;
    }
    .stSelectbox > div > div {
        background: rgba(255, 255, 255, 0.9);
        color: #333;
    }
    .stTextInput > div > div > input {
        background: rgba(255, 255, 255, 0.9);
        color: #333;
    }
    .stTextArea > div > div > textarea {
        background: rgba(255, 255, 255, 0.9);
        color: #333;
    }
    .stNumberInput > div > div > input {
        background: rgba(255, 255, 255, 0.9);
        color: #333;
    }
</style>
""", unsafe_allow_html=True)

# Falls Prevention header
st.markdown("""
<div class="falls-header">
    <h1>🛡️ Falls Prevention & Protection</h1>
    <p style="font-size: 1.1rem; margin-top: 0;">IHSA Standards & Ontario Construction Safety</p>
</div>
""", unsafe_allow_html=True)

# Critical warning
st.markdown("""
<div class="critical-warning">
    ⚠️ CRITICAL: Falls are the leading cause of construction fatalities in Ontario. 
    This assessment must be completed before any work at heights begins.
</div>
""", unsafe_allow_html=True)

# Initialize session state
if 'falls_data' not in st.session_state:
    st.session_state.falls_data = {}

# Work Information
st.markdown("## 📋 Work Information")
col1, col2 = st.columns(2)

with col1:
    work_location = st.text_input("Work Location:")
    work_description = st.text_area("Work Description:", height=80)
    supervisor_name = st.text_input("Supervisor Name:")
    work_date = st.date_input("Work Date:")

with col2:
    work_height = st.number_input("Work Height (m):", min_value=0.0, value=3.0, step=0.5)
    weather_conditions = st.selectbox("Weather Conditions:", ["Clear", "Rain", "Snow", "Wind", "Fog", "Extreme Heat", "Extreme Cold"])
    wind_speed = st.number_input("Wind Speed (km/h):", min_value=0, value=10, step=5)
    visibility = st.selectbox("Visibility:", ["Good", "Fair", "Poor"])

# Height Assessment
st.markdown("## 📏 Height Assessment")

if work_height > 3.0:
    st.markdown("""
    <div class="critical-warning">
        🚨 FALL PROTECTION REQUIRED: Work height exceeds 3 meters. 
        Fall protection systems must be in place before work begins.
    </div>
    """, unsafe_allow_html=True)

# Fall Protection Systems
st.markdown("## 🛡️ Fall Protection Systems")

st.markdown("""
<div class="form-section">
    <h3>Primary Fall Protection Methods</h3>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    st.markdown("### Guardrails & Barriers")
    guardrail_systems = {
        "Top rail installed": st.checkbox("Top rail installed (1.0-1.1m height)"),
        "Mid rail installed": st.checkbox("Mid rail installed (0.5m height)"),
        "Toe board installed": st.checkbox("Toe board installed (150mm height)"),
        "Guardrails certified": st.checkbox("Guardrails certified and tagged"),
        "Proper spacing": st.checkbox("Proper spacing between rails")
    }
    
    st.markdown("### Safety Nets")
    safety_nets = {
        "Safety net installed": st.checkbox("Safety net installed below work area"),
        "Net properly secured": st.checkbox("Net properly secured and tensioned"),
        "Net clearance": st.checkbox("Adequate clearance below net"),
        "Net inspection": st.checkbox("Net inspected before use")
    }

with col2:
    st.markdown("### Personal Fall Protection")
    personal_protection = {
        "Safety harness": st.checkbox("Safety harness worn properly"),
        "Lifeline installed": st.checkbox("Lifeline installed and secured"),
        "Anchor points": st.checkbox("Anchor points inspected and certified"),
        "Connectors": st.checkbox("Connectors in good condition"),
        "Shock absorbers": st.checkbox("Shock absorbers installed")
    }
    
    st.markdown("### Travel Restraint")
    travel_restraint = {
        "Travel restraint system": st.checkbox("Travel restraint system in place"),
        "Properly adjusted": st.checkbox("System properly adjusted"),
        "Anchor strength": st.checkbox("Anchor strength verified"),
        "Training completed": st.checkbox("Training completed for system use")
    }

# Equipment & Access
st.markdown("## 🏗️ Equipment & Access")

st.markdown("""
<div class="form-section">
    <h3>Access Equipment Assessment</h3>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    st.markdown("### Ladders")
    ladder_safety = {
        "Ladder inspected": st.checkbox("Ladder inspected before use"),
        "Proper angle": st.checkbox("Proper angle (4:1 ratio)"),
        "Secured at top": st.checkbox("Ladder secured at top"),
        "Extends above": st.checkbox("Ladder extends 1m above landing"),
        "No defects": st.checkbox("No visible defects or damage")
    }
    
    ladder_type = st.selectbox("Ladder Type:", ["Extension", "Step", "Fixed", "Portable", "Other"])
    ladder_length = st.number_input("Ladder Length (m):", min_value=1.0, value=6.0, step=0.5)

with col2:
    st.markdown("### Scaffolds")
    scaffold_safety = {
        "Scaffold certified": st.checkbox("Scaffold certified and tagged"),
        "Proper erection": st.checkbox("Properly erected by competent person"),
        "Guardrails installed": st.checkbox("Guardrails installed on all open sides"),
        "Access ladder": st.checkbox("Safe access ladder provided"),
        "Base plates": st.checkbox("Base plates on solid ground")
    }
    
    scaffold_height = st.number_input("Scaffold Height (m):", min_value=0.0, value=5.0, step=0.5)
    scaffold_type = st.selectbox("Scaffold Type:", ["Frame", "Tube & Clamp", "System", "Suspended", "Other"])

# Work Area Assessment
st.markdown("## 🔍 Work Area Assessment")

st.markdown("""
<div class="form-section">
    <h3>Hazard Identification</h3>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    st.markdown("### Surface Conditions")
    surface_conditions = {
        "Surface stable": st.checkbox("Working surface is stable"),
        "No holes": st.checkbox("No holes or openings in surface"),
        "Proper drainage": st.checkbox("Proper drainage to prevent slippery conditions"),
        "Weather protection": st.checkbox("Weather protection if needed"),
        "Load capacity": st.checkbox("Surface can support intended load")
    }
    
    st.markdown("### Overhead Hazards")
    overhead_hazards = {
        "Power lines": st.checkbox("Overhead power lines identified"),
        "Clearance verified": st.checkbox("Safe clearance from overhead hazards"),
        "Weather conditions": st.checkbox("Weather conditions assessed"),
        "Falling objects": st.checkbox("Protection from falling objects"),
        "Equipment clearance": st.checkbox("Equipment clearance verified")
    }

with col2:
    st.markdown("### Environmental Factors")
    environmental_factors = {
        "Wind assessment": st.checkbox("Wind conditions assessed"),
        "Temperature": st.checkbox("Temperature conditions suitable"),
        "Lighting": st.checkbox("Adequate lighting for work"),
        "Noise levels": st.checkbox("Noise levels acceptable"),
        "Air quality": st.checkbox("Air quality suitable for work")
    }
    
    st.markdown("### Emergency Access")
    emergency_access = {
        "Emergency plan": st.checkbox("Emergency plan in place"),
        "Rescue equipment": st.checkbox("Rescue equipment available"),
        "Communication": st.checkbox("Communication system working"),
        "First aid": st.checkbox("First aid kit accessible"),
        "Emergency contacts": st.checkbox("Emergency contacts posted")
    }

# Training & Competency
st.markdown("## 👷 Training & Competency")

st.markdown("""
<div class="form-section">
    <h3>Worker Qualifications</h3>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    st.markdown("### Training Requirements")
    training_requirements = {
        "Working at heights": st.checkbox("Working at Heights training completed"),
        "Fall protection": st.checkbox("Fall protection training completed"),
        "Equipment specific": st.checkbox("Equipment-specific training completed"),
        "Refresher training": st.checkbox("Refresher training current"),
        "Competent person": st.checkbox("Competent person designation")
    }
    
    training_date = st.date_input("Last Training Date:")
    training_provider = st.text_input("Training Provider:")

with col2:
    st.markdown("### Competency Assessment")
    competency_assessment = {
        "Practical assessment": st.checkbox("Practical assessment completed"),
        "Written test": st.checkbox("Written test passed"),
        "Supervisor approval": st.checkbox("Supervisor approval given"),
        "Equipment familiar": st.checkbox("Familiar with equipment"),
        "Emergency procedures": st.checkbox("Knows emergency procedures")
    }
    
    assessment_date = st.date_input("Competency Assessment Date:")
    assessor_name = st.text_input("Assessor Name:")

# Pre-Work Checklist
st.markdown("## ✅ Pre-Work Checklist")

st.markdown("""
<div class="form-section">
    <h3>Final Safety Checks</h3>
</div>
""", unsafe_allow_html=True)

pre_work_checks = {
    "Toolbox talk": st.checkbox("Toolbox talk completed"),
    "Equipment inspected": st.checkbox("All equipment inspected"),
    "Weather check": st.checkbox("Weather conditions acceptable"),
    "Communication": st.checkbox("Communication system tested"),
    "Emergency plan": st.checkbox("Emergency plan reviewed"),
    "PPE verified": st.checkbox("All PPE verified and worn"),
    "Work area clear": st.checkbox("Work area clear of hazards"),
    "Supervisor approval": st.checkbox("Supervisor approval obtained")
}

# Risk Assessment
st.markdown("## ⚠️ Risk Assessment")

risk_level = st.selectbox("Overall Risk Level:", ["Low", "Medium", "High", "Critical"])

if risk_level in ["High", "Critical"]:
    st.markdown("""
    <div class="critical-warning">
        🚨 HIGH RISK WORK: Additional controls required. 
        Work cannot proceed without supervisor approval and enhanced safety measures.
    </div>
    """, unsafe_allow_html=True)

risk_factors = st.multiselect(
    "Risk Factors Present:",
    ["Height > 6m", "Unstable surface", "Weather conditions", "Complex work", "Multiple workers", "Equipment operation", "Time pressure", "Inexperienced workers", "Poor visibility", "Wind > 40 km/h"]
)

# Comments and Recommendations
st.markdown("## 📝 Comments & Recommendations")

additional_comments = st.text_area("Additional Comments:", height=100)
recommendations = st.text_area("Safety Recommendations:", height=100)

# Stop Work Decision
if risk_level == "Critical" or work_height > 6.0:
    st.markdown("""
    <div class="critical-warning">
        🚨 STOP WORK ORDER: Critical risk level or extreme height detected. 
        Work cannot proceed without additional safety measures and management approval.
    </div>
    """, unsafe_allow_html=True)
    
    stop_work_reason = st.text_area("Stop Work Reason:", height=80)
    management_approval = st.checkbox("Management approval obtained")

# Save and Export
st.markdown("---")
col1, col2, col3 = st.columns([1, 1, 1])

with col1:
    if st.button("💾 Save Assessment", use_container_width=True):
        # Save falls prevention data
        st.session_state.falls_data = {
            "work_info": {
                "work_location": work_location,
                "work_description": work_description,
                "supervisor_name": supervisor_name,
                "work_date": str(work_date),
                "work_height": work_height,
                "weather_conditions": weather_conditions,
                "wind_speed": wind_speed,
                "visibility": visibility
            },
            "fall_protection": {
                "guardrail_systems": guardrail_systems,
                "safety_nets": safety_nets,
                "personal_protection": personal_protection,
                "travel_restraint": travel_restraint
            },
            "equipment_access": {
                "ladder_safety": ladder_safety,
                "ladder_type": ladder_type,
                "ladder_length": ladder_length,
                "scaffold_safety": scaffold_safety,
                "scaffold_height": scaffold_height,
                "scaffold_type": scaffold_type
            },
            "work_area": {
                "surface_conditions": surface_conditions,
                "overhead_hazards": overhead_hazards,
                "environmental_factors": environmental_factors,
                "emergency_access": emergency_access
            },
            "training_competency": {
                "training_requirements": training_requirements,
                "training_date": str(training_date),
                "training_provider": training_provider,
                "competency_assessment": competency_assessment,
                "assessment_date": str(assessment_date),
                "assessor_name": assessor_name
            },
            "pre_work_checks": pre_work_checks,
            "risk_assessment": {
                "risk_level": risk_level,
                "risk_factors": risk_factors,
                "additional_comments": additional_comments,
                "recommendations": recommendations
            },
            "stop_work": {
                "issued": risk_level == "Critical" or work_height > 6.0,
                "reason": stop_work_reason if risk_level == "Critical" or work_height > 6.0 else "",
                "management_approval": management_approval if risk_level == "Critical" or work_height > 6.0 else False
            },
            "timestamp": datetime.now().isoformat()
        }
        st.success("✅ Falls prevention assessment saved!")

with col2:
    if st.button("📋 View Assessment", use_container_width=True):
        st.json(st.session_state.falls_data)

with col3:
    if st.button("📤 Export Report", use_container_width=True):
        # Create falls prevention report
        report_file = {
            "falls_id": f"FALLS_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "date": datetime.now().isoformat(),
            "supervisor": supervisor_name,
            "data": st.session_state.falls_data
        }
        
        # Save to JSON file
        os.makedirs("falls_prevention", exist_ok=True)
        filename = f"falls_prevention/falls_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w') as f:
            json.dump(report_file, f, indent=2)
        
        st.success(f"✅ Falls prevention report exported to {filename}")

# Assessment Summary
st.markdown("---")
st.markdown("## 📊 Assessment Summary")

if st.session_state.falls_data:
    falls_data = st.session_state.falls_data
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Work Height", f"{falls_data.get('work_info', {}).get('work_height', 0)}m")
    
    with col2:
        risk_level = falls_data.get('risk_assessment', {}).get('risk_level', 'Unknown')
        st.metric("Risk Level", risk_level)
    
    with col3:
        protection_count = sum(falls_data.get('fall_protection', {}).get('guardrail_systems', {}).values()) + \
                          sum(falls_data.get('fall_protection', {}).get('personal_protection', {}).values())
        st.metric("Protection Systems", protection_count)
    
    with col4:
        checks_completed = sum(falls_data.get('pre_work_checks', {}).values())
        st.metric("Checks Completed", f"{checks_completed}/8")
    
    # Risk level indicator
    if risk_level == "Critical":
        st.markdown("""
        <div class="critical-warning">
            <h3>🚨 CRITICAL RISK</h3>
            <p>Work cannot proceed without additional safety measures</p>
        </div>
        """, unsafe_allow_html=True)
    elif risk_level == "High":
        st.markdown("""
        <div class="critical-warning">
            <h3>⚠️ HIGH RISK</h3>
            <p>Enhanced safety measures required</p>
        </div>
        """, unsafe_allow_html=True)
    elif risk_level == "Medium":
        st.markdown("""
        <div class="form-section">
            <h3>⚠️ MEDIUM RISK</h3>
            <p>Standard safety measures in place</p>
        </div>
        """, unsafe_allow_html=True)
    else:
        st.markdown("""
        <div class="form-section">
            <h3>✅ LOW RISK</h3>
            <p>Work can proceed with standard precautions</p>
        </div>
        """, unsafe_allow_html=True) 