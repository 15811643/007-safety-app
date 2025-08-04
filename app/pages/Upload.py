import streamlit as st
import pandas as pd
import os
from datetime import datetime

# Custom CSS for modern styling
st.markdown("""
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
""", unsafe_allow_html=True)

# Upload header
st.markdown("""
<div class="upload-header">
    <h1>📤 Upload Safety Inspection Data</h1>
    <p style="font-size: 1.1rem; margin-top: 0;">Upload your CSV files for AI-powered safety analysis</p>
</div>
""", unsafe_allow_html=True)

# File upload section
st.markdown("## 📁 Upload Your Data")

uploaded_file = st.file_uploader(
    "Choose a CSV file to upload",
    type="csv",
    help="Upload safety inspection data in CSV format"
)

if uploaded_file is not None:
    try:
        # Load the data
        df = pd.read_csv(uploaded_file)
        
        # Success message
        st.markdown(f"""
        <div class="success-card">
            <h3>✅ File Uploaded Successfully!</h3>
            <p><strong>Filename:</strong> {uploaded_file.name}</p>
            <p><strong>Records:</strong> {len(df):,} safety inspection records</p>
            <p><strong>Columns:</strong> {len(df.columns)} data fields</p>
        </div>
        """, unsafe_allow_html=True)
        
        # Data preview
        st.markdown("## 📋 Data Preview")
        st.dataframe(df.head(10), use_container_width=True)
        
        # Data validation
        st.markdown("## 🔍 Data Validation")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("### Required Columns Check")
            required_columns = ['hazard_type', 'severity', 'location', 'date']
            missing_columns = [col for col in required_columns if col not in df.columns]
            
            if missing_columns:
                st.error(f"❌ Missing columns: {', '.join(missing_columns)}")
            else:
                st.success("✅ All required columns present")
        
        with col2:
            st.markdown("### Data Quality Check")
            total_rows = len(df)
            null_rows = df.isnull().any(axis=1).sum()
            quality_score = ((total_rows - null_rows) / total_rows) * 100
            
            st.metric("Data Quality Score", f"{quality_score:.1f}%")
            
            if quality_score < 90:
                st.warning("⚠️ Some data quality issues detected")
            else:
                st.success("✅ High data quality")
        
        # AI Analysis section
        st.markdown("## 🤖 AI Analysis")
        
        analysis_options = st.multiselect(
            "Select analysis types:",
            ["Hazard Pattern Analysis", "Risk Assessment", "Compliance Check", "Trend Analysis", "Recommendations"],
            default=["Hazard Pattern Analysis", "Risk Assessment"]
        )
        
        if st.button("🚀 Start AI Analysis", use_container_width=True):
            with st.spinner("🤖 AI is analyzing your safety data..."):
                # Simulate AI analysis
                import time
                time.sleep(2)
                
                # Display AI insights
                st.markdown("### 🔍 AI Insights")
                
                insights_container = st.container()
                with insights_container:
                    st.markdown("""
                    <div class="info-card">
                        <h3>🚨 Key Safety Findings:</h3>
                        <ul>
                            <li><strong>Most Critical Hazard:</strong> Chemical exposure incidents showing 40% increase</li>
                            <li><strong>High-Risk Location:</strong> Laboratory B requires immediate attention</li>
                            <li><strong>Trend Analysis:</strong> Severity levels decreasing by 15% over last quarter</li>
                            <li><strong>Compliance Status:</strong> 92% compliance rate with safety standards</li>
                        </ul>
                    </div>
                    """, unsafe_allow_html=True)
                    
                    st.markdown("""
                    <div class="info-card">
                        <h3>📋 AI Recommendations:</h3>
                        <ol>
                            <li><strong>Immediate Action:</strong> Conduct safety audit of Laboratory B</li>
                            <li><strong>Training:</strong> Schedule chemical safety training for lab staff</li>
                            <li><strong>Equipment:</strong> Upgrade personal protective equipment in high-risk areas</li>
                            <li><strong>Monitoring:</strong> Implement weekly safety inspections</li>
                        </ol>
                    </div>
                    """, unsafe_allow_html=True)
                
                # Save analysis
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                analysis_filename = f"analysis_{timestamp}.txt"
                
                st.success(f"✅ Analysis completed and saved as {analysis_filename}")
                
                # Download analysis
                analysis_content = f"""
Safety Analysis Report
Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
File: {uploaded_file.name}
Records: {len(df):,}

KEY FINDINGS:
- Most Critical Hazard: Chemical exposure incidents
- High-Risk Location: Laboratory B
- Compliance Rate: 92%

RECOMMENDATIONS:
1. Conduct safety audit of Laboratory B
2. Schedule chemical safety training
3. Upgrade PPE in high-risk areas
4. Implement weekly inspections
                """
                
                st.download_button(
                    label="📥 Download Analysis Report",
                    data=analysis_content,
                    file_name=analysis_filename,
                    mime="text/plain"
                )
        
        # File storage
        st.markdown("## 💾 File Management")
        
        if st.button("💾 Save to Archive", use_container_width=True):
            # Create directories if they don't exist
            os.makedirs("data", exist_ok=True)
            os.makedirs("reports", exist_ok=True)
            
            # Save the file
            file_path = os.path.join("data", uploaded_file.name)
            with open(file_path, "wb") as f:
                f.write(uploaded_file.getvalue())
            
            st.success(f"✅ File saved to archive: {file_path}")
        
    except Exception as e:
        st.error(f"❌ Error processing file: {str(e)}")
        st.info("Please ensure your CSV file is properly formatted and contains valid data.")

else:
    # Show upload instructions
    st.markdown("## 📋 Upload Instructions")
    
    st.markdown("""
    <div class="upload-card">
        <h3>📤 How to Upload:</h3>
        <ol>
            <li><strong>Prepare your CSV file</strong> with safety inspection data</li>
            <li><strong>Include required columns:</strong> hazard_type, severity, location, date</li>
            <li><strong>Click "Browse files"</strong> above to select your CSV</li>
            <li><strong>Review the data preview</strong> and validation results</li>
            <li><strong>Run AI analysis</strong> to get insights and recommendations</li>
        </ol>
    </div>
    """, unsafe_allow_html=True)
    
    # Sample data download
    st.markdown("### 📥 Need Sample Data?")
    sample_data = pd.DataFrame({
        'hazard_type': ['Slip and Fall', 'Chemical Exposure', 'Equipment Malfunction', 'Fire Hazard', 'Electrical Hazard'],
        'severity': [3, 4, 2, 5, 3],
        'location': ['Warehouse A', 'Lab B', 'Production Line', 'Storage Area', 'Electrical Room'],
        'date': ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19'],
        'inspector': ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Wilson', 'Tom Brown'],
        'status': ['Open', 'Resolved', 'Open', 'In Progress', 'Resolved']
    })
    
    csv = sample_data.to_csv(index=False)
    st.download_button(
        label="📥 Download Sample CSV",
        data=csv,
        file_name="sample_safety_inspection_data.csv",
        mime="text/csv"
    )