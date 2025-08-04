import streamlit as st
import json
import os
from datetime import datetime

# Custom CSS for modern styling
st.markdown("""
<style>
    .previsit-header {
        background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }
    .form-section {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        border-left: 4px solid #4facfe;
    }
    .warning-box {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;
    }
    .stButton > button {
        background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 0.5rem 2rem;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)

# Pre-visit header
st.markdown("""
<div class="previsit-header">
    <h1>🏗️ Workplace Pre-Visit Assessment</h1>
    <p style="font-size: 1.1rem; margin-top: 0;">Site Survey & Job Preparation</p>
</div>
""", unsafe_allow_html=True)

# Initialize session state
if 'previsit_data' not in st.session_state:
    st.session_state.previsit_data = {}

# Job Information
st.markdown("## 📋 Job Information")
col1, col2 = st.columns(2)

with col1:
    job_number = st.text_input("Job Number:")
    client_name = st.text_input("Client Name:")
    site_address = st.text_area("Site Address:", height=80)
    surveyor_name = st.text_input("Surveyor Name:")

with col2:
    visit_date = st.date_input("Visit Date:")
    weather_conditions = st.selectbox("Weather Conditions:", ["Clear", "Rain", "Snow", "Fog", "Wind", "Extreme Heat", "Extreme Cold"])
    site_conditions = st.selectbox("Site Conditions:", ["Dry", "Wet", "Muddy", "Icy", "Snow covered"])
    access_restrictions = st.text_area("Access Restrictions:", height=80)

# Permit Requirements
st.markdown("## 📄 Permit Requirements")

permit_section = st.container()
with permit_section:
    st.markdown("""
    <div class="form-section">
        <h3>Required Permits & Approvals</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Excavation Permits")
        excavation_permits = {
            "Municipal permit": st.checkbox("Municipal excavation permit"),
            "Utility locates": st.checkbox("Utility locates completed"),
            "Traffic control": st.checkbox("Traffic control permit"),
            "Environmental": st.checkbox("Environmental assessment")
        }
        
        st.markdown("### Specialized Permits")
        specialized_permits = {
            "Rotary drill": st.checkbox("Rotary drill permit"),
            "Confined space": st.checkbox("Confined space entry permit"),
            "Hot work": st.checkbox("Hot work permit"),
            "Working at heights": st.checkbox("Working at heights permit")
        }
    
    with col2:
        st.markdown("### Permit Status")
        permit_status = st.selectbox("Overall Permit Status:", ["Pending", "In Progress", "Approved", "Rejected"])
        permit_notes = st.text_area("Permit Notes:", height=100)
        
        if permit_status == "Pending":
            st.warning("⚠️ Permits pending - work cannot proceed")

# Utility Conflicts
st.markdown("## ⚡ Utility Conflicts")

utility_section = st.container()
with utility_section:
    st.markdown("""
    <div class="form-section">
        <h3>Overhead & Underground Utilities</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Overhead Utilities")
        overhead_utilities = {
            "Power lines": st.checkbox("Overhead power lines"),
            "Telephone lines": st.checkbox("Telephone/cable lines"),
            "Street lights": st.checkbox("Street lights"),
            "Traffic signals": st.checkbox("Traffic signals")
        }
        
        if overhead_utilities["Power lines"]:
            power_voltage = st.selectbox("Power line voltage:", ["Low voltage", "Medium voltage", "High voltage"])
            clearance_distance = st.number_input("Required clearance (m):", min_value=0.0, value=3.0, step=0.1)
    
    with col2:
        st.markdown("### Underground Utilities")
        underground_utilities = {
            "Gas lines": st.checkbox("Natural gas lines"),
            "Water mains": st.checkbox("Water mains"),
            "Sewer lines": st.checkbox("Sewer lines"),
            "Telecom cables": st.checkbox("Telecommunications cables"),
            "Electrical": st.checkbox("Underground electrical")
        }
        
        st.markdown("### Utility Markings")
        utility_markings = st.selectbox("Utility markings present:", ["None", "Partial", "Complete"])
        marking_date = st.date_input("Marking date:")

# Environmental Conditions
st.markdown("## 🌿 Environmental Conditions")

environmental_section = st.container()
with environmental_section:
    st.markdown("""
    <div class="form-section">
        <h3>Environmental Assessment</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Waterways & Drainage")
        waterways = {
            "Dry waterways": st.checkbox("Dry waterways present"),
            "Wetlands": st.checkbox("Wetlands in area"),
            "Drainage ditches": st.checkbox("Drainage ditches"),
            "Flood risk": st.checkbox("Flood risk area")
        }
        
        st.markdown("### Wildlife & Vegetation")
        wildlife = {
            "Wildlife present": st.checkbox("Wildlife in area"),
            "Poisonous plants": st.checkbox("Poisonous plants identified"),
            "Protected species": st.checkbox("Protected species habitat"),
            "Tree removal": st.checkbox("Tree removal required")
        }
    
    with col2:
        st.markdown("### Environmental Permits")
        env_permits = {
            "Tree cutting": st.checkbox("Tree cutting permit"),
            "Wildlife protection": st.checkbox("Wildlife protection measures"),
            "Erosion control": st.checkbox("Erosion control plan"),
            "Spill prevention": st.checkbox("Spill prevention plan")
        }
        
        st.markdown("### Comments")
        environmental_comments = st.text_area("Environmental notes:", height=100)

# Site Logistics
st.markdown("## 🏕️ Site Logistics")

logistics_section = st.container()
with logistics_section:
    st.markdown("""
    <div class="form-section">
        <h3>Site Setup & Facilities</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Washroom Facilities")
        washroom_type = st.selectbox("Washroom type:", ["None", "Standard", "Female", "Accessible", "Multiple"])
        washroom_distance = st.number_input("Distance to washroom (m):", min_value=0, value=100, step=10)
        
        st.markdown("### Water Supply")
        water_available = st.checkbox("Potable water available")
        if water_available:
            water_quantity = st.number_input("Water quantity (litres):", min_value=0, value=100, step=10)
            water_source = st.selectbox("Water source:", ["Municipal", "Tanker", "Bottled", "Other"])
    
    with col2:
        st.markdown("### Crew Information")
        crew_size = st.number_input("Expected crew size:", min_value=1, value=5, step=1)
        work_duration = st.number_input("Expected work duration (days):", min_value=1, value=7, step=1)
        
        st.markdown("### Site Access")
        site_access = st.selectbox("Site access:", ["Easy", "Moderate", "Difficult", "Restricted"])
        parking_available = st.checkbox("Parking available")
        if parking_available:
            parking_spaces = st.number_input("Parking spaces:", min_value=1, value=5, step=1)

# Material & Equipment Checklist
st.markdown("## 🛠️ Material & Equipment Checklist")

equipment_section = st.container()
with equipment_section:
    st.markdown("""
    <div class="form-section">
        <h3>Required Materials & Equipment</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Traffic Control")
        traffic_equipment = {
            "Traffic barrels": st.number_input("Traffic barrels (qty):", min_value=0, value=10, step=5),
            "Warning signs": st.number_input("Warning signs (qty):", min_value=0, value=5, step=1),
            "Barricades": st.number_input("Barricades (qty):", min_value=0, value=4, step=2),
            "Flashing lights": st.number_input("Flashing lights (qty):", min_value=0, value=2, step=1)
        }
        
        st.markdown("### Trenching Equipment")
        trenching_equipment = {
            "Trench boxes": st.number_input("Trench boxes (qty):", min_value=0, value=2, step=1),
            "Shoring": st.checkbox("Shoring required"),
            "Gravel/sand (m³)": st.number_input("Gravel/sand (m³):", min_value=0.0, value=5.0, step=0.5)
        }
    
    with col2:
        st.markdown("### Pumps & Hoses")
        pumps_hoses = {
            "Pumps (qty)": st.number_input("Pumps (qty):", min_value=0, value=2, step=1),
            "Hoses (m)": st.number_input("Hoses (m):", min_value=0, value=50, step=10),
            "Fuel (litres)": st.number_input("Fuel (litres):", min_value=0, value=100, step=10)
        }
        
        st.markdown("### Heavy Equipment")
        heavy_equipment = {
            "Mini excavator": st.checkbox("Mini excavator required"),
            "Bucket truck": st.checkbox("Bucket truck required"),
            "Auger": st.checkbox("Auger required"),
            "Loader": st.checkbox("Loader required")
        }

# Specialist Roles
st.markdown("## 👷 Specialist Roles Required")

specialist_section = st.container()
with specialist_section:
    st.markdown("""
    <div class="form-section">
        <h3>Required Specialist Personnel</h3>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Safety Specialists")
        safety_specialists = {
            "Gas tech": st.checkbox("Gas technician"),
            "Confined space attendant": st.checkbox("Confined space attendant"),
            "Traffic control supervisor": st.checkbox("Traffic control supervisor"),
            "Safety officer": st.checkbox("Safety officer")
        }
        
        st.markdown("### Technical Specialists")
        technical_specialists = {
            "Surveyor": st.checkbox("Surveyor"),
            "Engineer": st.checkbox("Engineer"),
            "Environmental specialist": st.checkbox("Environmental specialist"),
            "Utility locator": st.checkbox("Utility locator")
        }
    
    with col2:
        st.markdown("### Equipment Operators")
        equipment_operators = {
            "Excavator operator": st.checkbox("Excavator operator"),
            "Crane operator": st.checkbox("Crane operator"),
            "Truck driver": st.checkbox("Truck driver"),
            "Equipment mechanic": st.checkbox("Equipment mechanic")
        }
        
        st.markdown("### Comments")
        specialist_comments = st.text_area("Specialist requirements notes:", height=100)

# Auto-enforced Logic
st.markdown("## ⚠️ Auto-Enforced Requirements")

logic_section = st.container()
with logic_section:
    st.markdown("""
    <div class="warning-box">
        <h3>🔍 Automatic Compliance Checks</h3>
    </div>
    """, unsafe_allow_html=True)
    
    # Check for deep trenching
    if 'trench_depth' in locals() and trench_depth > 1.2:
        st.warning("⚠️ Trench > 1.2m requires excavation-competent worker")
    
    # Check for overhead power lines
    if overhead_utilities["Power lines"]:
        st.warning("⚠️ Overhead power lines require specialized safety measures")
    
    # Check for confined space
    if specialized_permits["Confined space"]:
        st.warning("⚠️ Confined space work requires attendant and rescue plan")
    
    # Check for working at heights
    if specialized_permits["Working at heights"]:
        st.warning("⚠️ Working at heights requires fall protection")

# Save and Export
st.markdown("---")
col1, col2, col3 = st.columns([1, 1, 1])

with col1:
    if st.button("💾 Save Pre-Visit", use_container_width=True):
        # Save pre-visit data
        st.session_state.previsit_data = {
            "job_info": {
                "job_number": job_number,
                "client_name": client_name,
                "site_address": site_address,
                "surveyor_name": surveyor_name,
                "visit_date": str(visit_date),
                "weather_conditions": weather_conditions,
                "site_conditions": site_conditions,
                "access_restrictions": access_restrictions
            },
            "permits": {
                "excavation_permits": excavation_permits,
                "specialized_permits": specialized_permits,
                "permit_status": permit_status,
                "permit_notes": permit_notes
            },
            "utilities": {
                "overhead_utilities": overhead_utilities,
                "underground_utilities": underground_utilities,
                "utility_markings": utility_markings,
                "marking_date": str(marking_date)
            },
            "environmental": {
                "waterways": waterways,
                "wildlife": wildlife,
                "env_permits": env_permits,
                "environmental_comments": environmental_comments
            },
            "logistics": {
                "washroom_type": washroom_type,
                "washroom_distance": washroom_distance,
                "water_available": water_available,
                "crew_size": crew_size,
                "work_duration": work_duration,
                "site_access": site_access,
                "parking_available": parking_available
            },
            "equipment": {
                "traffic_equipment": traffic_equipment,
                "trenching_equipment": trenching_equipment,
                "pumps_hoses": pumps_hoses,
                "heavy_equipment": heavy_equipment
            },
            "specialists": {
                "safety_specialists": safety_specialists,
                "technical_specialists": technical_specialists,
                "equipment_operators": equipment_operators,
                "specialist_comments": specialist_comments
            },
            "timestamp": datetime.now().isoformat()
        }
        st.success("✅ Pre-visit data saved!")

with col2:
    if st.button("📋 View Data", use_container_width=True):
        st.json(st.session_state.previsit_data)

with col3:
    if st.button("📤 Export Report", use_container_width=True):
        # Create pre-visit report
        report_file = {
            "previsit_id": f"PRE_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "date": datetime.now().isoformat(),
            "surveyor": surveyor_name,
            "data": st.session_state.previsit_data
        }
        
        # Save to JSON file
        os.makedirs("previsits", exist_ok=True)
        filename = f"previsits/previsit_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w') as f:
            json.dump(report_file, f, indent=2)
        
        st.success(f"✅ Pre-visit report exported to {filename}")

# Summary
st.markdown("---")
st.markdown("## 📊 Pre-Visit Summary")

if st.session_state.previsit_data:
    summary_data = st.session_state.previsit_data
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Crew Size", summary_data.get("logistics", {}).get("crew_size", 0))
    
    with col2:
        st.metric("Work Duration", f"{summary_data.get('logistics', {}).get('work_duration', 0)} days")
    
    with col3:
        permit_count = sum(summary_data.get("permits", {}).get("excavation_permits", {}).values()) + \
                      sum(summary_data.get("permits", {}).get("specialized_permits", {}).values())
        st.metric("Required Permits", permit_count)
    
    with col4:
        specialist_count = sum(summary_data.get("specialists", {}).get("safety_specialists", {}).values()) + \
                          sum(summary_data.get("specialists", {}).get("technical_specialists", {}).values())
        st.metric("Specialists", specialist_count) 