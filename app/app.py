import os, runpy, sys
ROOT = os.path.dirname(os.path.abspath(file))
APP = os.path.join(ROOT, "007-safety-app")
if APP not in sys.path: sys.path.append(APP)
os.chdir(APP)
runpy.run_path(os.path.join(APP, "streamlit_app.py"), run_name="main")
