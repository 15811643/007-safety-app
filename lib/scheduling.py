from typing import List, Dict

Task = Dict[str, object]

# Very small CPM helper (no calendars, just days)

def topo_sort(tasks: List[Task]) -> List[Task]:
    by_id = {t["id"]: t for t in tasks}
    indeg = {t["id"]: 0 for t in tasks}
    for t in tasks:
        for p in t.get("preds", []):
            indeg[t["id"]] += 1
    q = [by_id[i] for i, d in indeg.items() if d == 0]
    out = []
    while q:
        n = q.pop(0)
        out.append(n)
        for t in tasks:
            if n["id"] in t.get("preds", []):
                indeg[t["id"]] -= 1
                if indeg[t["id"]] == 0:
                    q.append(t)
    return out


def compute_early(tasks: List[Task]) -> None:
    order = topo_sort(tasks)
    es = {}
    for t in order:
        preds = t.get("preds", [])
        t_es = 0 if not preds else max(es[p] + next(tt for tt in tasks if tt["id"] == p)["dur"] for p in preds)
        es[t["id"]] = t_es
        t["ES"] = t_es
        t["EF"] = t_es + int(t["dur"])  # type: ignore
