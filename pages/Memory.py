import streamlit as st
import json
import os
from datetime import datetime

# Custom CSS for modern styling
st.markdown(
    """
<style>
    .memory-header {
        background: linear-gradient(90deg, #11998e 0%, #38ef7d 100%);
        padding: 2rem;
        border-radius: 15px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }
    .memory-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 1rem 0;
        border-left: 4px solid #11998e;
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

# Memory header
st.markdown(
    """
<div class="memory-header">
    <h1>Safety Memory Archive</h1>
    <p style="font-size: 1.1rem; margin-top: 0;">Historical Safety Data &amp; AI Analysis</p>
</div>
""",
    unsafe_allow_html=True,
)

# Search and filter
st.markdown("## Search & Filter")

col1, col2, col3 = st.columns(3)

with col1:
    search_term = st.text_input("Search entries:", placeholder="Enter keywords...")

with col2:
    date_filter = st.date_input("Filter by date:")

with col3:
    entry_type = st.selectbox(
        "Entry type:", ["All", "Inspections", "Audits", "Pre-Visits", "Reports"]
    )

# Memory entries display
st.markdown("## Memory Entries")

# Check for existing memory files
memory_entries = []

# Check inspections directory
inspections_dir = "inspections"
if os.path.exists(inspections_dir):
    for file in os.listdir(inspections_dir):
        if file.endswith(".json"):
            try:
                with open(os.path.join(inspections_dir, file), "r") as f:
                    data = json.load(f)
                    memory_entries.append(
                        {
                            "type": "Inspection",
                            "id": data.get("inspection_id", file),
                            "date": data.get("date", ""),
                            "title": f"Inspection: {file}",
                            "content": str(data.get("sections", {})),
                        }
                    )
            except:
                pass

# Check audits directory
audits_dir = "audits"
if os.path.exists(audits_dir):
    for file in os.listdir(audits_dir):
        if file.endswith(".json"):
            try:
                with open(os.path.join(audits_dir, file), "r") as f:
                    data = json.load(f)
                    memory_entries.append(
                        {
                            "type": "Audit",
                            "id": data.get("audit_id", file),
                            "date": data.get("date", ""),
                            "title": f"Audit: {data.get('data', {}).get('audit_info', {}).get('job_site', file)}",
                            "content": str(
                                data.get("data", {}).get("overall_assessment", {})
                            ),
                        }
                    )
            except:
                pass

# Check previsits directory
previsits_dir = "previsits"
if os.path.exists(previsits_dir):
    for file in os.listdir(previsits_dir):
        if file.endswith(".json"):
            try:
                with open(os.path.join(previsits_dir, file), "r") as f:
                    data = json.load(f)
                    memory_entries.append(
                        {
                            "type": "Pre-Visit",
                            "id": data.get("previsit_id", file),
                            "date": data.get("date", ""),
                            "title": f"Pre-Visit: {data.get('data', {}).get('job_info', {}).get('job_number', file)}",
                            "content": str(data.get("data", {}).get("job_info", {})),
                        }
                    )
            except:
                pass

# Filter entries
if search_term:
    memory_entries = [
        entry
        for entry in memory_entries
        if search_term.lower() in entry["title"].lower()
        or search_term.lower() in entry["content"].lower()
    ]

if entry_type != "All":
    memory_entries = [entry for entry in memory_entries if entry["type"] == entry_type]

# Sort by date
memory_entries.sort(key=lambda x: x["date"], reverse=True)

# Display entries
if memory_entries:
    st.success(f"Found {len(memory_entries)} memory entries")

    for entry in memory_entries:
        st.markdown(
            f"""
        <div class="memory-card">
            <h3>{entry['title']}</h3>
            <p><strong>Type:</strong> {entry['type']}</p>
            <p><strong>ID:</strong> {entry['id']}</p>
            <p><strong>Date:</strong> {entry['date'][:10] if entry['date'] else 'Unknown'}</p>
            <details>
                <summary>View Details</summary>
                <pre style="background: #f8f9fa; padding: 1rem; border-radius: 5px; overflow-x: auto;">{entry['content'][:500]}...</pre>
            </details>
        </div>
        """,
            unsafe_allow_html=True,
        )
else:
    st.info(
        "No memory entries found. Complete some inspections, audits, or pre-visits to see them here!"
    )

# Memory statistics
st.markdown("---")
st.markdown("## Memory Statistics")

if memory_entries:
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        total_entries = len(memory_entries)
        st.metric("Total Entries", total_entries)

    with col2:
        inspection_count = len([e for e in memory_entries if e["type"] == "Inspection"])
        st.metric("Inspections", inspection_count)

    with col3:
        audit_count = len([e for e in memory_entries if e["type"] == "Audit"])
        st.metric("Audits", audit_count)

    with col4:
        previsit_count = len([e for e in memory_entries if e["type"] == "Pre-Visit"])
        st.metric("Pre-Visits", previsit_count)

# Export functionality
st.markdown("---")
st.markdown("## Export Memory")

col1, col2, col3 = st.columns(3)

with col1:
    if st.button("Export as JSON", use_container_width=True):
        if memory_entries:
            export_data = {
                "export_date": datetime.now().isoformat(),
                "total_entries": len(memory_entries),
                "entries": memory_entries,
            }
            st.download_button(
                label="Download JSON",
                data=json.dumps(export_data, indent=2),
                file_name=f"memory_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                mime="application/json",
            )
        else:
            st.warning("No entries to export")

with col2:
    if st.button("Export as CSV", use_container_width=True):
        if memory_entries:
            import pandas as pd

            df = pd.DataFrame(memory_entries)
            csv = df.to_csv(index=False)
            st.download_button(
                label="Download CSV",
                data=csv,
                file_name=f"memory_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                mime="text/csv",
            )
        else:
            st.warning("No entries to export")

