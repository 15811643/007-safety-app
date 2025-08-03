import streamlit as st
from app.core import gpt_wrapper, data_utils, memory_store
import os

st.title("📤 Upload Inspection File")

uploaded_file = st.file_uploader("Upload CSV file", type="csv")
if uploaded_file:
    try:
        df = data_utils.validate_csv(uploaded_file)
        st.dataframe(df)

        prompt = data_utils.get_summary_prompt(df)
        with st.spinner("Summarizing with GPT..."):
            summary = gpt_wrapper.ask_gpt(prompt)

        st.subheader("🧠 AI Summary")
        st.write(summary)

        memory_store.save_summary(uploaded_file.name, summary)
        with open(os.path.join("data", uploaded_file.name), "wb") as f:
            f.write(uploaded_file.read())
        st.success("Summary saved and file stored.")
    except Exception as e:
        st.error(str(e))