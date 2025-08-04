import streamlit as st

# Page configuration
st.set_page_config(
    page_title="007 Safety Inspection Assistant",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for the main app
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(90deg, #1f4037 0%, #99f2c8 100%);
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }
    .feature-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        border-left: 4px solid #1f4037;
        transition: transform 0.2s;
    }
    .feature-card:hover {
        transform: translateY(-2px);
    }
    .stButton > button {
        background: linear-gradient(90deg, #1f4037 0%, #99f2c8 100%);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 0.5rem 2rem;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)

# Main header
st.markdown("""
<div class="main-header">
    <h1>🛡️ 007 Safety Inspection Assistant</h1>
    <p style="font-size: 1.2rem; margin-top: 0;">Comprehensive Safety Management System</p>
</div>
""", unsafe_allow_html=True)

# Navigation
st.markdown("## 🚀 Quick Navigation")

# Create navigation cards
col1, col2 = st.columns(2)

with col1:
    st.markdown("""
    <div class="feature-card">
        <h3>📋 Safety Inspection Form</h3>
        <p>Complete modular safety inspections with comprehensive compliance</p>
        <ul>
            <li>Traffic Control Plan</li>
            <li>Trenching Safety Plan</li>
            <li>Overhead Hazards</li>
            <li>Lifting Plan</li>
            <li>Permit to Work</li>
            <li>Working at Heights</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    if st.button("📋 Start Inspection", key="inspection", use_container_width=True):
        st.switch_page("pages/InspectionForm.py")
    
    st.markdown("""
    <div class="feature-card">
        <h3>🏗️ Workplace Pre-Visit</h3>
        <p>Site survey and job preparation for surveyors</p>
        <ul>
            <li>Permit requirements</li>
            <li>Utility conflicts</li>
            <li>Environmental conditions</li>
            <li>Site logistics</li>
            <li>Equipment checklist</li>
            <li>Specialist roles</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    if st.button("🏗️ Pre-Visit Assessment", key="previsit", use_container_width=True):
        st.switch_page("pages/PreVisit.py")

with col2:
    st.markdown("""
    <div class="feature-card">
        <h3>👨‍💼 Supervisor Audit Tool</h3>
        <p>Remote safety audits with compliance monitoring</p>
        <ul>
            <li>Safety equipment & PPE</li>
            <li>Work practices</li>
            <li>Site conditions</li>
            <li>Equipment & machinery</li>
            <li>Hazard management</li>
            <li>Stop work decisions</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    if st.button("👨‍💼 Start Audit", key="audit", use_container_width=True):
        st.switch_page("pages/SupervisorAudit.py")
    
    st.markdown("""
    <div class="feature-card">
        <h3>📊 Safety Analytics</h3>
        <p>Real-time safety metrics and trend analysis</p>
        <ul>
            <li>Interactive dashboards</li>
            <li>Data visualization</li>
            <li>AI-powered insights</li>
            <li>Risk pattern detection</li>
            <li>Compliance tracking</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    if st.button("📊 View Dashboard", key="dashboard", use_container_width=True):
        st.switch_page("pages/Dashboard.py")

# Additional features
st.markdown("## 🔧 Additional Tools")

col1, col2, col3, col4 = st.columns(4)

with col1:
    if st.button("📤 Upload Data", use_container_width=True):
        st.switch_page("pages/Upload.py")

with col2:
    if st.button("📋 View Reports", use_container_width=True):
        st.switch_page("pages/Reports.py")

with col3:
    if st.button("💾 Memory Archive", use_container_width=True):
        st.switch_page("pages/Memory.py")

with col4:
    if st.button("🛡️ Falls Prevention", use_container_width=True):
        st.switch_page("pages/FallsPrevention.py")

# App overview
st.markdown("---")
st.markdown("## 📋 App Overview")

st.markdown("""
<div class="feature-card">
    <h3>🎯 Core Purpose</h3>
    <p>A full-featured safety inspection and job preparation app used by:</p>
    <ul>
        <li><strong>Field workers</strong> - Complete safety inspections</li>
        <li><strong>Surveyors</strong> - Conduct pre-visit assessments</li>
        <li><strong>Supervisors</strong> - Perform remote audits</li>
        <li><strong>Project managers</strong> - Monitor compliance and trends</li>
    </ul>
</div>
""", unsafe_allow_html=True)

# Key features summary
st.markdown("## ✅ Key Features")

col1, col2 = st.columns(2)

with col1:
    st.markdown("""
    <div class="feature-card">
        <h3>🛡️ Safety Compliance</h3>
        <ul>
            <li>Comprehensive safety standards</li>
            <li>Auto-enforced safety logic</li>
            <li>Stop work decision support</li>
            <li>Comprehensive audit trails</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <div class="feature-card">
        <h3>🤖 AI-Powered Analysis</h3>
        <ul>
            <li>GPT-4 safety insights</li>
            <li>Risk pattern detection</li>
            <li>Automated recommendations</li>
            <li>Compliance guidance</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="feature-card">
        <h3>📊 Data Management</h3>
        <ul>
            <li>JSON-based data storage</li>
            <li>Export to multiple formats</li>
            <li>Historical data tracking</li>
            <li>Real-time analytics</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <div class="feature-card">
        <h3>🚀 Deployment Ready</h3>
        <ul>
            <li>Streamlit Cloud deployment</li>
            <li>Mobile-responsive design</li>
            <li>Offline capability</li>
            <li>Multi-user support</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666; padding: 1rem;">
    <p>🛡️ <strong>007 Safety Assistant</strong> - Your comprehensive safety sidekick</p>
    <p>Built with Streamlit & OpenAI GPT-4</p>
</div>
""", unsafe_allow_html=True)