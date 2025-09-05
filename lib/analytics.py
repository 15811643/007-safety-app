from datetime import datetime, timedelta
from collections import Counter, defaultdict
from sqlmodel import Session, select
from lib.db import engine, RiskRecord, AuditRecord, ActionItem

DEF_30 = timedelta(days=30)
DEF_90 = timedelta(days=90)


def _parse_when(dtiso: str) -> datetime:
    try:
        return datetime.fromisoformat(dtiso)
    except Exception:
        return datetime.utcnow()


def repeat_hazards(window: timedelta = DEF_90, threshold: int = 3):
    now = datetime.utcnow()
    with Session(engine) as s:
        stmt = select(RiskRecord)
        risks = s.exec(stmt).all()
    # Group by (site, hazard)
    recent = [(r.site, r.hazard) for r in risks if now - _parse_when(r.created_at) <= window]
    counts = Counter(recent)
    flagged = [
        {"site": k[0], "hazard": k[1], "count": v}
        for k, v in counts.items() if v >= threshold
    ]
    return sorted(flagged, key=lambda x: x["count"], reverse=True)


def kpi_summary():
    try:
        now = datetime.utcnow()
        with Session(engine) as s:
            open_actions = s.exec(select(ActionItem).where(ActionItem.status == "Open")).all()
            risks_30d = [r for r in s.exec(select(RiskRecord)).all() if now - _parse_when(r.created_at) <= DEF_30 and r.rating >= 12]
            audits_month = [a for a in s.exec(select(AuditRecord)).all() if now.month == _parse_when(a.date_iso).month and now.year == _parse_when(a.date_iso).year]
        return {
            "open_actions": len(open_actions),
            "high_risks_30d": len(risks_30d),
            "repeat_hazards_90d": len(repeat_hazards()),
            "audits_month": len(audits_month),
        }
    except Exception:
        # Return default values if there's any error
        return {
            "open_actions": 0,
            "high_risks_30d": 0,
            "repeat_hazards_90d": 0,
            "audits_month": 0,
        }
