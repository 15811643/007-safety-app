import streamlit as st
from lib.gpt_wrapper import ask_gpt

st.set_page_config(page_title="Safety Inspection", layout="wide")

st.header("📋 Safety Inspection Form")

# Basic inspection form
with st.form("inspection_form"):
    st.subheader("Site Information")
    site = st.text_input("Site/Location")
    inspector = st.text_input("Inspector Name")
    date = st.date_input("Inspection Date")
    
    st.subheader("Safety Checklist")
    ppe_compliant = st.checkbox("PPE Compliance")
    equipment_safe = st.checkbox("Equipment Safety Check")
    hazard_controls = st.checkbox("Hazard Controls in Place")
    emergency_exits = st.checkbox("Emergency Exits Clear")
    
    st.subheader("Issues Found")
    issues = st.text_area("Describe any safety issues found")
    
    st.subheader("Recommendations")
    recommendations = st.text_area("Safety recommendations")
    
    submitted = st.form_submit_button("Submit Inspection", type="primary")

if submitted:
    st.success("Inspection submitted successfully!")
    
    # Generate AI insights if issues are found
    if issues:
        st.subheader("🤖 AI Safety Insights")
        prompt = f"""
        Based on this safety inspection:
        Site: {site}
        Issues found: {issues}
        Recommendations: {recommendations}
        
        Provide 3 specific safety recommendations to address these issues.
        """
        
        with st.spinner("Generating AI insights..."):
            ai_response = ask_gpt(prompt)
            st.write(ai_response)
