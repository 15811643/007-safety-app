import streamlit as st

# Custom CSS for modern styling
st.markdown(
    """
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
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 10px;
        text-align: center;
        margin: 1rem 0;
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
""",
    unsafe_allow_html=True,
)

# Main header with gradient
st.markdown(
    """
<div class="main-header">
    <h1>007 Safety Inspection Assistant</h1>
    <p style="font-size: 1.2rem; margin-top: 0;">AI-Powered Safety Analysis &amp; Compliance Management</p>
    
</div>
""",
    unsafe_allow_html=True,
)

# Key metrics row
col1, col2, col3, col4 = st.columns(4)

with col1:
    st.markdown(
        """
    <div class="metric-card">
        <h3>📊</h3>
        <h2>Analytics</h2>
        <p>Real-time Safety Insights</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

with col2:
    st.markdown(
        """
    <div class="metric-card">
        <h3>🤖</h3>
        <h2>AI Analysis</h2>
        <p>GPT-4 Powered Reports</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

with col3:
    st.markdown(
        """
    <div class="metric-card">
        <h3>📈</h3>
        <h2>Trends</h2>
        <p>Hazard Pattern Detection</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

with col4:
    st.markdown(
        """
    <div class="metric-card">
        <h3>✅</h3>
        <h2>Compliance</h2>
        <p>Regulatory Standards</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

# Features section
st.markdown("## Key Features")

col1, col2 = st.columns(2)

with col1:
    st.markdown(
        """
    <div class="feature-card">
        <h3>Smart File Upload</h3>
        <p>Upload inspection CSVs and get instant AI-powered analysis with hazard identification and risk assessment.</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

    st.markdown(
        """
    <div class="feature-card">
        <h3>Interactive Dashboard</h3>
        <p>Real-time safety metrics, trend analysis, and visual charts for comprehensive safety monitoring.</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

with col2:
    st.markdown(
        """
    <div class="feature-card">
        <h3>AI-Powered Reports</h3>
        <p>Generate detailed safety reports with GPT-4 analysis, recommendations, and compliance insights.</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

    st.markdown(
        """
    <div class="feature-card">
        <h3>Memory Archive</h3>
        <p>Store and retrieve historical safety data, AI summaries, and trend analysis for continuous improvement.</p>
    </div>
    """,
        unsafe_allow_html=True,
    )

# Quick start section
st.markdown("## Quick Start")

st.markdown(
    """
<div class="feature-card">
    <h3>Get Started in 3 Steps:</h3>
    <ol>
        <li><strong>Upload Data:</strong> Use the Upload page to import your safety inspection CSV files</li>
        <li><strong>Analyze:</strong> View real-time analytics and AI insights on the Dashboard</li>
        <li><strong>Report:</strong> Generate comprehensive safety reports with actionable recommendations</li>
    </ol>
</div>
""",
    unsafe_allow_html=True,
)

# Call to action
st.markdown("---")
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    if st.button("Start Safety Analysis", use_container_width=True):
        st.switch_page("pages/Upload.py")

# Footer
st.markdown("---")
st.markdown(
    """
<div style=\"text-align: center; color: #666; padding: 1rem;\">
    <p><strong>007 Safety Assistant</strong> - Your AI-powered safety sidekick</p>
    <p>Built with Streamlit &amp; OpenAI GPT-4</p>
</div>
""",
    unsafe_allow_html=True,
)

