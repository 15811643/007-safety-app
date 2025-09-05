import streamlit as st
from lib.db import init_db, list_previsits, get_previsit
from lib.reports import render_html, try_html_to_pdf_bytes
import os

init_db()
st.set_page_config(page_title="Reports & Exports", layout="wide")

st.header("📊 Reports & Exports")

rows = list_previsits(200)
if not rows:
    st.info("No records to export yet.")
else:
    options = {f"#{r.id} — {r.site} ({r.date_iso})": r.id for r in rows}
    choice = st.selectbox("Select a Pre-Visit to export", options.keys())
    rec = get_previsit(options[choice])

    company_name = os.getenv("COMPANY_NAME", "Your Company")
    company_address = os.getenv("COMPANY_ADDRESS", "")

    context = {
        "title": f"Pre-Visit Report #{rec.id}",
        "company_name": company_name,
        "company_address": company_address,
        "rec": rec.__dict__,
    }

    html = render_html(context)

    c1, c2 = st.columns(2)
    with c1:
        st.download_button("Download HTML", data=html, file_name=f"previsit_{rec.id}.html", mime="text/html")
    with c2:
        pdf_bytes = try_html_to_pdf_bytes(html)
        if pdf_bytes:
            st.download_button("Download PDF", data=pdf_bytes, file_name=f"previsit_{rec.id}.pdf", mime="application/pdf")
        else:
            st.warning("WeasyPrint not installed. Download HTML and **Print → Save as PDF**.")

    with st.expander("Preview"):
        st.components.v1.html(html, height=600, scrolling=True)
