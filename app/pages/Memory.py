import streamlit as st
from app.core import memory_store

st.title("🧾 Memory Log")

mem = memory_store.load_memory()
if not mem:
    st.warning("No inspection summaries stored.")
else:
    for entry in reversed(mem):
        st.markdown(f"**File:** {entry['file']}")
        st.markdown(f"_Date:_ {entry['timestamp']}")
        st.code(entry['summary'])
        st.markdown("---")