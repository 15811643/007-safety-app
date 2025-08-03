import streamlit as st
from app.core import memory_store
import datetime

st.title("📝 Generate Reports")

mem = memory_store.load_memory()
if not mem:
    st.info("No memory entries found.")
else:
    for entry in reversed(mem[-5:]):
        st.markdown(f"### File: {entry['file']}")
        st.markdown(f"_Date: {entry['timestamp']}_")
        st.markdown(entry['summary'])
        st.markdown("---")