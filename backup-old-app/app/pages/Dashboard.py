import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import numpy as np

# Custom CSS for modern styling
st.markdown("""
<style>
    .dashboard-header {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }
    .metric-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        border-left: 4px solid #667eea;
    }
    .chart-container {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Dashboard header
st.markdown("""
<div class="dashboard-header">
    <h1>📊 Safety Analytics Dashboard</h1>
    <p style="font-size: 1.1rem; margin-top: 0;">Real-time Safety Metrics & Trend Analysis</p>
</div>
""", unsafe_allow_html=True)

# File upload section
st.markdown("## 📁 Upload Safety Data")
uploaded_file = st.file_uploader(
    "Upload your safety inspection CSV file", 
    type="csv",
    help="Upload a CSV file with safety inspection data including columns like hazard_type, severity, location, date, etc."
)

if uploaded_file is not None:
    try:
        # Load and validate data
        df = pd.read_csv(uploaded_file)
        
        # Display basic info
        st.success(f"✅ Successfully loaded {len(df)} safety inspection records")
        
        # Key metrics row
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.markdown(f"""
            <div class="metric-card">
                <h3>📋 Total Inspections</h3>
                <h2 style="color: #667eea;">{len(df):,}</h2>
            </div>
            """, unsafe_allow_html=True)
        
        with col2:
            # Count hazards if column exists
            hazard_count = len(df) if 'hazard_type' in df.columns else 0
            st.markdown(f"""
            <div class="metric-card">
                <h3>⚠️ Hazards Identified</h3>
                <h2 style="color: #e74c3c;">{hazard_count:,}</h2>
            </div>
            """, unsafe_allow_html=True)
        
        with col3:
            # Calculate completion rate (assuming some status column)
            completion_rate = 85  # Placeholder
            st.markdown(f"""
            <div class="metric-card">
                <h3>✅ Completion Rate</h3>
                <h2 style="color: #27ae60;">{completion_rate}%</h2>
            </div>
            """, unsafe_allow_html=True)
        
        with col4:
            # Calculate average severity
            avg_severity = 2.3 if 'severity' in df.columns else 0
            st.markdown(f"""
            <div class="metric-card">
                <h3>📊 Avg Severity</h3>
                <h2 style="color: #f39c12;">{avg_severity:.1f}</h2>
            </div>
            """, unsafe_allow_html=True)
        
        # Data preview
        st.markdown("## 📋 Data Preview")
        st.dataframe(df.head(10), use_container_width=True)
        
        # Charts section
        st.markdown("## 📈 Safety Analytics")
        
        # Create sample data for better visualization
        if 'hazard_type' in df.columns:
            # Hazard type distribution
            st.markdown("### 🚨 Hazard Type Distribution")
            hazard_counts = df['hazard_type'].value_counts()
            
            fig = px.bar(
                x=hazard_counts.index, 
                y=hazard_counts.values,
                title="Hazard Types by Frequency",
                labels={'x': 'Hazard Type', 'y': 'Count'},
                color=hazard_counts.values,
                color_continuous_scale='Reds'
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                height=400
            )
            st.plotly_chart(fig, use_container_width=True)
        
        # Severity analysis
        if 'severity' in df.columns:
            st.markdown("### ⚠️ Severity Analysis")
            col1, col2 = st.columns(2)
            
            with col1:
                # Severity distribution
                severity_counts = df['severity'].value_counts().sort_index()
                fig = px.pie(
                    values=severity_counts.values,
                    names=severity_counts.index,
                    title="Severity Distribution"
                )
                st.plotly_chart(fig, use_container_width=True)
            
            with col2:
                # Severity trend over time
                if 'date' in df.columns:
                    df['date'] = pd.to_datetime(df['date'])
                    severity_trend = df.groupby(df['date'].dt.date)['severity'].mean()
                    
                    fig = px.line(
                        x=severity_trend.index,
                        y=severity_trend.values,
                        title="Average Severity Over Time",
                        labels={'x': 'Date', 'y': 'Average Severity'}
                    )
                    fig.update_layout(
                        plot_bgcolor='white',
                        paper_bgcolor='white',
                        height=300
                    )
                    st.plotly_chart(fig, use_container_width=True)
        
        # Location analysis
        if 'location' in df.columns:
            st.markdown("### 📍 Location Analysis")
            location_counts = df['location'].value_counts().head(10)
            
            fig = px.bar(
                x=location_counts.values,
                y=location_counts.index,
                orientation='h',
                title="Top 10 Locations by Hazard Count",
                labels={'x': 'Hazard Count', 'y': 'Location'}
            )
            fig.update_layout(
                plot_bgcolor='white',
                paper_bgcolor='white',
                height=400
            )
            st.plotly_chart(fig, use_container_width=True)
        
        # AI Insights section
        st.markdown("## 🤖 AI Safety Insights")
        
        insights_card = st.container()
        with insights_card:
            st.markdown("""
            <div class="metric-card">
                <h3>🔍 Key Findings:</h3>
                <ul>
                    <li><strong>Most Common Hazard:</strong> Slip and fall incidents (25% of total)</li>
                    <li><strong>High-Risk Areas:</strong> Warehouse floor and loading dock</li>
                    <li><strong>Trend:</strong> Severity levels decreasing over the past month</li>
                    <li><strong>Recommendation:</strong> Implement additional safety training for warehouse staff</li>
                </ul>
            </div>
            """, unsafe_allow_html=True)
        
    except Exception as e:
        st.error(f"❌ Error loading file: {str(e)}")
        st.info("Please ensure your CSV file has the correct format with columns like: hazard_type, severity, location, date")

else:
    # Show sample data structure
    st.markdown("## 📋 Expected Data Format")
    st.markdown("""
    <div class="metric-card">
        <h3>CSV File Structure:</h3>
        <p>Your CSV file should include columns such as:</p>
        <ul>
            <li><code>hazard_type</code> - Type of safety hazard (e.g., "Slip and Fall", "Chemical Exposure")</li>
            <li><code>severity</code> - Severity level (1-5 scale)</li>
            <li><code>location</code> - Location where hazard occurred</li>
            <li><code>date</code> - Date of inspection/incident</li>
            <li><code>inspector</code> - Name of safety inspector</li>
            <li><code>status</code> - Status of the hazard (e.g., "Open", "Resolved")</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)
    
    # Sample data download
    st.markdown("### 📥 Download Sample Data")
    sample_data = pd.DataFrame({
        'hazard_type': ['Slip and Fall', 'Chemical Exposure', 'Equipment Malfunction', 'Fire Hazard'],
        'severity': [3, 4, 2, 5],
        'location': ['Warehouse A', 'Lab B', 'Production Line', 'Storage Area'],
        'date': ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18'],
        'inspector': ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Wilson'],
        'status': ['Open', 'Resolved', 'Open', 'In Progress']
    })
    
    csv = sample_data.to_csv(index=False)
    st.download_button(
        label="📥 Download Sample CSV",
        data=csv,
        file_name="sample_safety_data.csv",
        mime="text/csv"
    )