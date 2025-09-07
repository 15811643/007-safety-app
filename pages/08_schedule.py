import streamlit as st
import plotly.express as px
from lib.scheduling import compute_early

st.set_page_config(page_title="Scheduling (P6-lite)", layout="wide")

st.header("Scheduling (P6-lite)")

st.write(
    "Enter a few tasks with durations and predecessors (IDs). Example included."
)


def parse_csv(txt: str):
    # Expect CSV-like rows: id,name,dur,preds(space-separated)
    lines = [l.strip() for l in txt.splitlines() if l.strip()]
    tasks = []
    for ln in lines:
        parts = [p.strip() for p in ln.split(",")]
        if len(parts) < 3:
            continue
        _id = parts[0]
        name = parts[1]
        dur = int(parts[2])
        preds = parts[3].split() if len(parts) > 3 and parts[3] else []
        tasks.append({"id": _id, "name": name, "dur": dur, "preds": preds})
    return tasks


example = (
    """
A, Mobilize, 2,
B, Site Setup, 3, A
C, Trenching, 5, B
D, Inspection, 1, C
E, Demobilize, 1, D
"""
).strip()

inp = st.text_area("Tasks (CSV)", height=180, value=example)

if st.button("Compute Schedule", type="primary"):
    tasks = parse_csv(inp)
    if not tasks:
        st.error("No tasks parsed.")
    else:
        compute_early(tasks)
        st.success("Computed early dates (day 0 start).")
        st.dataframe(tasks, use_container_width=True)

        # Build simple Gantt from ES/EF
        gantt_rows = []
        for t in tasks:
            gantt_rows.append(
                {
                    "Task": f"{t['id']} - {t['name']}",
                    "Start": t["ES"],
                    "Finish": t["EF"],
                }
            )
        fig = px.timeline(gantt_rows, x_start="Start", x_end="Finish", y="Task")
        fig.update_yaxes(autorange="reversed")
        st.plotly_chart(fig, use_container_width=True)

