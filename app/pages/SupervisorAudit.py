import streamlit as st
import json
import os
from datetime import datetime

# Custom CSS for modern styling
st.markdown("""
<style>
    .audit-header {
        background: linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%);
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
        border-left: 4px solid #ff9a9e;
    }
    .stop-work {
        background: #ff6b6b;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        border: 2px solid #e74c3c;
    }
    .needs-attention {
        background: #f39c12;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        border: 2px solid #e67e22;
    }
    .satisfactory {
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        border: 2px solid #2ecc71;
    }
    .stButton > button {
        background: linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 0.5rem 2rem;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)

# Audit header
st.markdown("""
<div class="audit-header">
    <h1>👨‍💼 Supervisor Audit Tool</h1>
    <p style="font-size: 1.1rem; margin-top: 0;">Remote Safety Audits & Compliance Monitoring</p>
</div>
""", unsafe_allow_html=True)

# Initialize session state
if 'audit_data' not in st.session_state:
    st.session_state.audit_data = {}

# Audit Information
st.markdown("## 📋 Audit Information")
col1, col2 = st.columns(2)

with col1:
    audit_number = st.text_input("Audit Number:")
    job_site = st.text_input("Job Site:")
    supervisor_name = st.text_input("Supervisor Name:")
    audit_date = st.date_input("Audit Date:")

with col2:
    audit_type = st.selectbox("Audit Type:", ["Routine", "Incident Follow-up", "Compliance", "Pre-start", "Emergency"])
    weather_conditions = st.selectbox("Weather Conditions:", ["Clear", "Rain", "Snow", "Fog", "Wind"])
    crew_size = st.number_input("Crew Size:", min_value=1, value=5, step=1)

# Audit Categories
st.markdown("## 🔍 Audit Categories")

# Safety Equipment & PPE
st.markdown("### 🛡️ Safety Equipment & PPE")
col1, col2 = st.columns(2)

with col1:
    ppe_status = st.selectbox("PPE Compliance:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    ppe_comments = st.text_area("PPE Comments:", height=80)
    
    if ppe_status == "Stop Work – Contact Supervision":
        st.markdown("""
        <div class="stop-work">
            <h4>🚨 STOP WORK ORDER</h4>
            <p>PPE compliance issue requires immediate supervisor contact</p>
        </div>
        """, unsafe_allow_html=True)

with col2:
    equipment_status = st.selectbox("Safety Equipment:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    equipment_comments = st.text_area("Equipment Comments:", height=80)

# Work Practices
st.markdown("### ⚙️ Work Practices")
col1, col2 = st.columns(2)

with col1:
    procedures_status = st.selectbox("Safe Work Procedures:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    procedures_comments = st.text_area("Procedures Comments:", height=80)
    
    communication_status = st.selectbox("Communication:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    communication_comments = st.text_area("Communication Comments:", height=80)

with col2:
    training_status = st.selectbox("Training & Competency:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    training_comments = st.text_area("Training Comments:", height=80)
    
    supervision_status = st.selectbox("Supervision:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    supervision_comments = st.text_area("Supervision Comments:", height=80)

# Site Conditions
st.markdown("### 🏗️ Site Conditions")
col1, col2 = st.columns(2)

with col1:
    housekeeping_status = st.selectbox("Housekeeping:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    housekeeping_comments = st.text_area("Housekeeping Comments:", height=80)
    
    access_status = st.selectbox("Site Access:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    access_comments = st.text_area("Access Comments:", height=80)

with col2:
    traffic_status = st.selectbox("Traffic Control:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    traffic_comments = st.text_area("Traffic Control Comments:", height=80)
    
    environmental_status = st.selectbox("Environmental Controls:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    environmental_comments = st.text_area("Environmental Comments:", height=80)

# Equipment & Machinery
st.markdown("### 🚜 Equipment & Machinery")
col1, col2 = st.columns(2)

with col1:
    equipment_operation_status = st.selectbox("Equipment Operation:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    equipment_operation_comments = st.text_area("Equipment Operation Comments:", height=80)
    
    maintenance_status = st.selectbox("Equipment Maintenance:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    maintenance_comments = st.text_area("Maintenance Comments:", height=80)

with col2:
    rigging_status = st.selectbox("Rigging & Lifting:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    rigging_comments = st.text_area("Rigging Comments:", height=80)
    
    tools_status = st.selectbox("Tools & Equipment:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    tools_comments = st.text_area("Tools Comments:", height=80)

# Hazard Management
st.markdown("### ⚠️ Hazard Management")
col1, col2 = st.columns(2)

with col1:
    hazard_identification_status = st.selectbox("Hazard Identification:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    hazard_identification_comments = st.text_area("Hazard ID Comments:", height=80)
    
    risk_assessment_status = st.selectbox("Risk Assessment:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    risk_assessment_comments = st.text_area("Risk Assessment Comments:", height=80)

with col2:
    controls_status = st.selectbox("Hazard Controls:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    controls_comments = st.text_area("Controls Comments:", height=80)
    
    emergency_status = st.selectbox("Emergency Procedures:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    emergency_comments = st.text_area("Emergency Comments:", height=80)

# Compliance & Documentation
st.markdown("### 📄 Compliance & Documentation")
col1, col2 = st.columns(2)

with col1:
    permits_status = st.selectbox("Permits & Approvals:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    permits_comments = st.text_area("Permits Comments:", height=80)
    
    documentation_status = st.selectbox("Documentation:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    documentation_comments = st.text_area("Documentation Comments:", height=80)

with col2:
    inspections_status = st.selectbox("Inspections:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    inspections_comments = st.text_area("Inspections Comments:", height=80)
    
    training_records_status = st.selectbox("Training Records:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
    training_records_comments = st.text_area("Training Records Comments:", height=80)

# Overall Assessment
st.markdown("## 📊 Overall Assessment")

overall_status = st.selectbox("Overall Audit Status:", ["Satisfactory", "Needs Attention", "Stop Work – Contact Supervision"])
overall_comments = st.text_area("Overall Comments:", height=100)

# Immediate Actions Required
st.markdown("## ⚡ Immediate Actions Required")

immediate_actions = st.text_area("List immediate actions required:", height=100)
action_deadline = st.date_input("Action Deadline:")
responsible_person = st.text_input("Responsible Person:")

# Follow-up Actions
st.markdown("## 🔄 Follow-up Actions")

follow_up_actions = st.text_area("List follow-up actions:", height=100)
follow_up_deadline = st.date_input("Follow-up Deadline:")
follow_up_person = st.text_input("Follow-up Responsible Person:")

# Stop Work Decision
st.markdown("## 🚨 Stop Work Decision")

if overall_status == "Stop Work – Contact Supervision":
    st.markdown("""
    <div class="stop-work">
        <h3>🚨 STOP WORK ORDER ISSUED</h3>
        <p><strong>Reason:</strong> {}</p>
        <p><strong>Immediate Action Required:</strong> Contact supervisor immediately</p>
        <p><strong>Work cannot resume until:</strong> Issues resolved and supervisor approval obtained</p>
    </div>
    """.format(overall_comments), unsafe_allow_html=True)
    
    stop_work_reason = st.text_area("Detailed stop work reason:", height=100)
    contact_supervisor = st.checkbox("Supervisor contacted")
    if contact_supervisor:
        contact_time = st.time_input("Contact time:")
        supervisor_response = st.text_area("Supervisor response:", height=80)

# Save and Export
st.markdown("---")
col1, col2, col3 = st.columns([1, 1, 1])

with col1:
    if st.button("💾 Save Audit", use_container_width=True):
        # Save audit data
        st.session_state.audit_data = {
            "audit_info": {
                "audit_number": audit_number,
                "job_site": job_site,
                "supervisor_name": supervisor_name,
                "audit_date": str(audit_date),
                "audit_type": audit_type,
                "weather_conditions": weather_conditions,
                "crew_size": crew_size
            },
            "audit_results": {
                "ppe": {"status": ppe_status, "comments": ppe_comments},
                "equipment": {"status": equipment_status, "comments": equipment_comments},
                "procedures": {"status": procedures_status, "comments": procedures_comments},
                "communication": {"status": communication_status, "comments": communication_comments},
                "training": {"status": training_status, "comments": training_comments},
                "supervision": {"status": supervision_status, "comments": supervision_comments},
                "housekeeping": {"status": housekeeping_status, "comments": housekeeping_comments},
                "access": {"status": access_status, "comments": access_comments},
                "traffic": {"status": traffic_status, "comments": traffic_comments},
                "environmental": {"status": environmental_status, "comments": environmental_comments},
                "equipment_operation": {"status": equipment_operation_status, "comments": equipment_operation_comments},
                "maintenance": {"status": maintenance_status, "comments": maintenance_comments},
                "rigging": {"status": rigging_status, "comments": rigging_comments},
                "tools": {"status": tools_status, "comments": tools_comments},
                "hazard_identification": {"status": hazard_identification_status, "comments": hazard_identification_comments},
                "risk_assessment": {"status": risk_assessment_status, "comments": risk_assessment_comments},
                "controls": {"status": controls_status, "comments": controls_comments},
                "emergency": {"status": emergency_status, "comments": emergency_comments},
                "permits": {"status": permits_status, "comments": permits_comments},
                "documentation": {"status": documentation_status, "comments": documentation_comments},
                "inspections": {"status": inspections_status, "comments": inspections_comments},
                "training_records": {"status": training_records_status, "comments": training_records_comments}
            },
            "overall_assessment": {
                "status": overall_status,
                "comments": overall_comments,
                "immediate_actions": immediate_actions,
                "action_deadline": str(action_deadline),
                "responsible_person": responsible_person,
                "follow_up_actions": follow_up_actions,
                "follow_up_deadline": str(follow_up_deadline),
                "follow_up_person": follow_up_person
            },
            "stop_work": {
                "issued": overall_status == "Stop Work – Contact Supervision",
                "reason": stop_work_reason if overall_status == "Stop Work – Contact Supervision" else "",
                "supervisor_contacted": contact_supervisor if overall_status == "Stop Work – Contact Supervision" else False
            },
            "timestamp": datetime.now().isoformat()
        }
        st.success("✅ Audit data saved!")

with col2:
    if st.button("📋 View Audit", use_container_width=True):
        st.json(st.session_state.audit_data)

with col3:
    if st.button("📤 Export Audit", use_container_width=True):
        # Create audit report
        audit_file = {
            "audit_id": f"AUDIT_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "date": datetime.now().isoformat(),
            "supervisor": supervisor_name,
            "data": st.session_state.audit_data
        }
        
        # Save to JSON file
        os.makedirs("audits", exist_ok=True)
        filename = f"audits/audit_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w') as f:
            json.dump(audit_file, f, indent=2)
        
        st.success(f"✅ Audit report exported to {filename}")

# Audit Summary
st.markdown("---")
st.markdown("## 📊 Audit Summary")

if st.session_state.audit_data:
    audit_data = st.session_state.audit_data
    
    # Count statuses
    satisfactory_count = 0
    needs_attention_count = 0
    stop_work_count = 0
    
    for category, data in audit_data.get("audit_results", {}).items():
        if data["status"] == "Satisfactory":
            satisfactory_count += 1
        elif data["status"] == "Needs Attention":
            needs_attention_count += 1
        elif data["status"] == "Stop Work – Contact Supervision":
            stop_work_count += 1
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Satisfactory", satisfactory_count)
    
    with col2:
        st.metric("Needs Attention", needs_attention_count)
    
    with col3:
        st.metric("Stop Work", stop_work_count)
    
    with col4:
        total_categories = len(audit_data.get("audit_results", {}))
        compliance_rate = (satisfactory_count / total_categories * 100) if total_categories > 0 else 0
        st.metric("Compliance Rate", f"{compliance_rate:.1f}%")
    
    # Overall status indicator
    overall_status = audit_data.get("overall_assessment", {}).get("status", "")
    if overall_status == "Satisfactory":
        st.markdown("""
        <div class="satisfactory">
            <h3>✅ Overall Status: Satisfactory</h3>
            <p>Work can continue with normal supervision</p>
        </div>
        """, unsafe_allow_html=True)
    elif overall_status == "Needs Attention":
        st.markdown("""
        <div class="needs-attention">
            <h3>⚠️ Overall Status: Needs Attention</h3>
            <p>Issues identified - follow-up required</p>
        </div>
        """, unsafe_allow_html=True)
    elif overall_status == "Stop Work – Contact Supervision":
        st.markdown("""
        <div class="stop-work">
            <h3>🚨 Overall Status: Stop Work</h3>
            <p>Immediate supervisor contact required</p>
        </div>
        """, unsafe_allow_html=True) 