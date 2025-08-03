import streamlit as st
import pandas as pd
from app.core import data_utils

st.title("📊 Safety Dashboard")

uploaded_file = st.file_uploader("Upload CSV to visualize", type="csv")
if uploaded_file:
    try:
        df = data_utils.validate_csv(uploaded_file)
        st.dataframe(df)

        if data_utils.has_column(df, "hazard_type"):
            st.bar_chart(df["hazard_type"].value_counts())
        else:
            st.warning("Column 'hazard_type' not found.")
    except Exception as e:
        st.error(str(e))