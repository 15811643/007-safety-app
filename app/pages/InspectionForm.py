import streamlit as st
import json
import os
from datetime import datetime

# Custom CSS for modern styling
st.markdown("""
<style>
    .inspection-header {
        background: linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%);
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }
    .form-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        border-left: 4px solid #ff6b6b;
    }
    .form-section h3 {
        color: white;
        margin-bottom: 1rem;
    }
    .checkbox-container {
        background: rgba(255, 255, 255, 0.1);
        padding: 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .section-title {
        background: linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
        font-weight: bold;
        font-size: 1.2rem;
    }
    .stButton > button {
        background: linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%);
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

# Inspection header
st.markdown("""
<div class="inspection-header">
    <h1>📋 Safety Inspection Form</h1>
    <p style="font-size: 1.1rem; margin-top: 0;">Comprehensive Safety Compliance</p>
</div>
""", unsafe_allow_html=True)

# Initialize session state
if 'inspection_data' not in st.session_state:
    st.session_state.inspection_data = {}

# Form sections
sections = [
    "Traffic Control Plan",
    "Trenching Safety Plan", 
    "Overhead Hazards",
    "Lifting Plan",
    "Permit to Work",
    "Working at Heights"
]

# Sidebar for navigation
st.sidebar.markdown("## 📋 Inspection Sections")
selected_section = st.sidebar.selectbox("Select Section:", sections)

# Main form content
st.markdown(f"""
<div class="section-title">
    {selected_section}
</div>
""", unsafe_allow_html=True)

# Traffic Control Plan
if selected_section == "Traffic Control Plan":
    st.markdown("""
    <div class="form-section">
        <h3>🚦 Traffic Control Requirements</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Traffic Control Equipment")
        traffic_equipment = {
            "Traffic barrels/cones": st.checkbox("Traffic barrels/cones available"),
            "Warning signs": st.checkbox("Warning signs posted"),
            "Flag person": st.checkbox("Flag person assigned"),
            "Barricades": st.checkbox("Barricades installed"),
            "Flashing lights": st.checkbox("Flashing lights operational")
        }
        
        st.markdown("### Traffic Plan Elements")
        traffic_plan = {
            "Plan reviewed": st.checkbox("Traffic control plan reviewed"),
            "Speed limits": st.checkbox("Speed limits posted"),
            "Detour routes": st.checkbox("Detour routes established"),
            "Emergency access": st.checkbox("Emergency access maintained")
        }
    
    with col2:
        st.markdown("### Site Conditions")
        site_conditions = {
            "Weather conditions": st.selectbox("Weather conditions:", ["Clear", "Rain", "Snow", "Fog", "Wind"]),
            "Visibility": st.selectbox("Visibility:", ["Good", "Fair", "Poor"]),
            "Road conditions": st.selectbox("Road conditions:", ["Dry", "Wet", "Icy", "Snow covered"])
        }
        
        st.markdown("### Comments")
        traffic_comments = st.text_area("Additional comments:", height=100)

# Trenching Safety Plan
elif selected_section == "Trenching Safety Plan":
    st.markdown("""
    <div class="form-section">
        <h3>⛏️ Trenching & Excavation Safety</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Trench Specifications")
        trench_depth = st.number_input("Trench depth (m):", min_value=0.0, max_value=10.0, value=1.5, step=0.1)
        trench_width = st.number_input("Trench width (m):", min_value=0.0, max_value=5.0, value=0.6, step=0.1)
        
        # Auto-enforce logic for deep trenches
        if trench_depth > 1.2:
            st.warning("⚠️ Trench > 1.2m requires excavation-competent worker")
            competent_worker = st.checkbox("Excavation-competent worker present", value=True)
        
        st.markdown("### Protective Systems")
        protective_systems = {
            "Trench boxes": st.checkbox("Trench boxes installed"),
            "Shoring": st.checkbox("Shoring in place"),
            "Sloping": st.checkbox("Proper sloping"),
            "Benching": st.checkbox("Benching implemented")
        }
    
    with col2:
        st.markdown("### Utility Checks")
        utility_checks = {
            "Utilities located": st.checkbox("All utilities located and marked"),
            "Clearance maintained": st.checkbox("Safe clearance from utilities"),
            "Gas lines": st.checkbox("Gas lines identified"),
            "Electrical": st.checkbox("Electrical lines identified")
        }
        
        st.markdown("### Soil Conditions")
        soil_type = st.selectbox("Soil type:", ["Rock", "Clay", "Silt", "Sand", "Mixed"])
        soil_stability = st.selectbox("Soil stability:", ["Stable", "Moderate", "Unstable"])
        
        st.markdown("### Comments")
        trench_comments = st.text_area("Trenching comments:", height=100)

# Overhead Hazards
elif selected_section == "Overhead Hazards":
    st.markdown("""
    <div class="form-section">
        <h3>⚡ Overhead Hazards Assessment</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Electrical Hazards")
        electrical_hazards = {
            "Power lines": st.checkbox("Overhead power lines present"),
            "Clearance checked": st.checkbox("Safe clearance verified"),
            "Equipment height": st.checkbox("Equipment height within limits"),
            "Spotter assigned": st.checkbox("Spotter assigned for overhead work")
        }
        
        if electrical_hazards["Power lines"]:
            clearance_distance = st.number_input("Minimum clearance distance (m):", min_value=0.0, value=3.0, step=0.1)
    
    with col2:
        st.markdown("### Other Overhead Hazards")
        other_hazards = {
            "Trees/branches": st.checkbox("Overhanging trees/branches"),
            "Signs/structures": st.checkbox("Signs or structures overhead"),
            "Cranes/equipment": st.checkbox("Cranes or other equipment overhead"),
            "Weather conditions": st.checkbox("Weather affecting overhead work")
        }
        
        st.markdown("### Comments")
        overhead_comments = st.text_area("Overhead hazard comments:", height=100)

# Lifting Plan
elif selected_section == "Lifting Plan":
    st.markdown("""
    <div class="form-section">
        <h3>🏗️ Lifting & Rigging Safety</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Equipment & Setup")
        lifting_equipment = {
            "Crane inspected": st.checkbox("Crane inspected and certified"),
            "Load capacity": st.checkbox("Load within capacity limits"),
            "Ground conditions": st.checkbox("Ground conditions suitable"),
            "Outriggers deployed": st.checkbox("Outriggers properly deployed")
        }
        
        load_weight = st.number_input("Load weight (kg):", min_value=0, value=1000, step=100)
        boom_length = st.number_input("Boom length (m):", min_value=0.0, value=10.0, step=0.5)
    
    with col2:
        st.markdown("### Personnel")
        lifting_personnel = {
            "Signal person": st.checkbox("Signal person assigned"),
            "Competent operator": st.checkbox("Competent operator"),
            "Rigging inspected": st.checkbox("Rigging inspected"),
            "Load secure": st.checkbox("Load properly secured")
        }
        
        st.markdown("### Comments")
        lifting_comments = st.text_area("Lifting plan comments:", height=100)

# Permit to Work
elif selected_section == "Permit to Work":
    st.markdown("""
    <div class="form-section">
        <h3>📄 Permit to Work System</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Permit Details")
        permit_number = st.text_input("Permit number:")
        permit_type = st.selectbox("Permit type:", ["Hot Work", "Confined Space", "Excavation", "Working at Heights", "Electrical"])
        permit_issuer = st.text_input("Permit issuer:")
        permit_date = st.date_input("Permit date:")
    
    with col2:
        st.markdown("### Permit Conditions")
        permit_conditions = {
            "Conditions reviewed": st.checkbox("All conditions reviewed"),
            "Hazards identified": st.checkbox("Hazards identified and controlled"),
            "PPE specified": st.checkbox("Required PPE specified"),
            "Emergency procedures": st.checkbox("Emergency procedures reviewed")
        }
        
        st.markdown("### Comments")
        permit_comments = st.text_area("Permit comments:", height=100)

# Working at Heights
elif selected_section == "Working at Heights":
    st.markdown("""
    <div class="form-section">
        <h3>🏗️ Working at Heights Safety</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Fall Protection")
        fall_protection = {
            "Guardrails": st.checkbox("Guardrails installed"),
            "Safety harness": st.checkbox("Safety harness worn"),
            "Lifeline": st.checkbox("Lifeline properly secured"),
            "Anchor points": st.checkbox("Anchor points inspected")
        }
        
        work_height = st.number_input("Work height (m):", min_value=0.0, value=3.0, step=0.5)
        
        if work_height > 3.0:
            st.warning("⚠️ Work > 3m requires fall protection")
    
    with col2:
        st.markdown("### Equipment & Access")
        height_equipment = {
            "Ladder inspected": st.checkbox("Ladder inspected and secure"),
            "Scaffold certified": st.checkbox("Scaffold certified and tagged"),
            "Access points": st.checkbox("Safe access points established"),
            "Weather conditions": st.checkbox("Weather suitable for work")
        }
        
        st.markdown("### Comments")
        height_comments = st.text_area("Working at heights comments:", height=100)

# Save and navigation buttons
st.markdown("---")
col1, col2, col3 = st.columns([1, 1, 1])

with col1:
    if st.button("💾 Save Section", use_container_width=True):
        # Save current section data
        st.session_state.inspection_data[selected_section] = {
            "completed": True,
            "timestamp": datetime.now().isoformat(),
            "data": locals()
        }
        st.success(f"✅ {selected_section} saved!")

with col2:
    if st.button("📋 View All Data", use_container_width=True):
        st.json(st.session_state.inspection_data)

with col3:
    if st.button("📤 Export Inspection", use_container_width=True):
        # Create inspection file
        inspection_file = {
            "inspection_id": f"INSP_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "date": datetime.now().isoformat(),
            "inspector": "Field Inspector",
            "sections": st.session_state.inspection_data
        }
        
        # Save to JSON file
        os.makedirs("inspections", exist_ok=True)
        filename = f"inspections/inspection_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w') as f:
            json.dump(inspection_file, f, indent=2)
        
        st.success(f"✅ Inspection exported to {filename}")

# Progress indicator
st.markdown("---")
st.markdown("## 📊 Inspection Progress")
completed_sections = len([s for s in sections if s in st.session_state.inspection_data])
progress = completed_sections / len(sections)

st.progress(progress)
st.markdown(f"**{completed_sections}/{len(sections)} sections completed**")

# Section status
for section in sections:
    status = "✅" if section in st.session_state.inspection_data else "⏳"
    st.markdown(f"{status} {section}") 