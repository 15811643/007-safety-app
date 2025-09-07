import streamlit as st
import pandas as pd
from datetime import datetime

# Custom CSS for modern styling
st.markdown(
    """
<style>
    .upload-header {
        background: linear-gradient(90deg, #11998e 0%, #38ef7d 100%);
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }
    .upload-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        border: 2px dashed #11998e;
    }
    .success-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 10px;
        margin: 1rem 0;
    }
    .info-card {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        border-left: 4px solid #17a2b8;
        margin: 1rem 0;
    }
    .stButton > button {
        background: linear-gradient(90deg, #11998e 0%, #38ef7d 100%);
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

# Upload header
st.markdown(
    """
<div class="upload-header">
    <h1>Upload Safety Inspection Data</h1>
    <p style="font-size: 1.1rem; margin-top: 0;">Upload your CSV files for AI-powered safety analysis</p>
</div>
""",
    unsafe_allow_html=True,
)

# File upload section
st.markdown("## Upload Your Data")

uploaded_file = st.file_uploader(
    "Choose a CSV file to upload", type="csv", help="Upload safety inspection data in CSV format"
)

if uploaded_file is not None:
    try:
        # Load the data
        df = pd.read_csv(uploaded_file)

        # Success message
        st.markdown(
            f"""
        <div class=\"success-card\">
            <h3>File Uploaded Successfully!</h3>
            <p><strong>Filename:</strong> {uploaded_file.name}</p>
            <p><strong>Records:</strong> {len(df):,} safety inspection records</p>
            <p><strong>Columns:</strong> {len(df.columns)} data fields</p>
        </div>
        """,
            unsafe_allow_html=True,
        )

        # Data preview
        st.markdown("## Data Preview")
        st.dataframe(df.head(10), use_container_width=True)

        # Data validation
        st.markdown("## Data Validation")

        col1, col2 = st.columns(2)

        with col1:
            st.markdown("### Required Columns Check")
            required_columns = ["hazard_type", "severity", "location", "date"]
            missing_columns = [col for col in required_columns if col not in df.columns]

            if missing_columns:
                st.error(f"Missing columns: {', '.join(missing_columns)}")
            else:
                st.success("All required columns present")

        with col2:
            st.markdown("### Data Quality Check")
            total_rows = len(df)
            null_rows = df.isnull().any(axis=1).sum()
            quality_score = ((total_rows - null_rows) / total_rows) * 100

            st.metric("Data Quality Score", f"{quality_score:.1f}%")

            if quality_score < 90:
                st.warning("Some data quality issues detected")
            else:
                st.success("High data quality")

        # AI Analysis section
        st.markdown("## AI Analysis")

        analysis_options = st.multiselect(
            "Select analysis types:",
            [
                "Hazard Pattern Analysis",
                "Risk Assessment",
                "Compliance Check",
                "Trend Analysis",
                "Recommendations",
            ],
            default=["Hazard Pattern Analysis", "Risk Assessment"],
        )

        if st.button("Start AI Analysis", use_container_width=True):
            with st.spinner("Analyzing your safety data..."):
                import time

                time.sleep(2)

                # Display AI insights (placeholder)
                st.markdown("### AI Insights")

                insights_container = st.container()
                with insights_container:
                    st.markdown(
                        """
                    <div class="info-card">
                        <h3>Key Safety Findings:</h3>
                        <ul>
                            <li><strong>Most Critical Hazard:</strong> Chemical exposure incidents showing 40% increase</li>
                            <li><strong>High-Risk Location:</strong> Laboratory B requires immediate attention</li>
                            <li><strong>Trend Analysis:</strong> Severity levels decreasing by 15% over last quarter</li>
                            <li><strong>Compliance Status:</strong> 92% compliance rate with safety standards</li>
                        </ul>
                    </div>
                    """,
                        unsafe_allow_html=True,
                    )

                    st.markdown(
                        """
                    <div class="info-card">
                        <h3>AI Recommendations:</h3>
                        <ol>
                            <li><strong>Immediate Action:</strong> Conduct safety audit of Laboratory B</li>
                            <li><strong>Training:</strong> Schedule chemical safety training for lab staff</li>
                            <li><strong>Equipment:</strong> Upgrade personal protective equipment in high-risk areas</li>
                            <li><strong>Monitoring:</strong> Implement weekly safety inspections</li>
                        </ol>
                    </div>
                    """,
                        unsafe_allow_html=True,
                    )

                # Save analysis
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                analysis_filename = f"analysis_{timestamp}.txt"

