import os, runpy, sys
APP = os.path.join(os.path.dirname(file), "007-safety-app")
if APP not in sys.path: sys.path.append(APP)
os.chdir(APP)
runpy.run_path("streamlit_app.py", run_name="main")
