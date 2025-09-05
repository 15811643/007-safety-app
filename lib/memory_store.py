import os
import json
from datetime import datetime

MEMORY_FILE = "memory/inspections.json"
os.makedirs("memory", exist_ok=True)
if not os.path.exists(MEMORY_FILE):
    with open(MEMORY_FILE, "w") as f:
        json.dump([], f)

def load_memory():
    with open(MEMORY_FILE, "r") as f:
        return json.load(f)

def save_summary(file_name, summary):
    history = load_memory()
    history.append({
        "file": file_name,
        "summary": summary,
        "timestamp": datetime.utcnow().isoformat()
    })
    with open(MEMORY_FILE, "w") as f:
        json.dump(history, f, indent=2)