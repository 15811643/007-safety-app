from typing import Optional, Iterable, List
from sqlmodel import SQLModel, Field, create_engine, Session, select
from datetime import date, datetime, timedelta
import os

DEFAULT_DB_URL = os.getenv("DB_URL", "sqlite:///./data/007.db")
engine = create_engine(DEFAULT_DB_URL, connect_args={"check_same_thread": False})

class PreVisitRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    site: str
    crew_size: int
    confined_space: bool
    attendant: Optional[str] = None
    materials: Optional[str] = None
    hazards: Optional[str] = None
    date_iso: str
    created_by: Optional[str] = None

class RiskRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    site: str
    hazard: str
    category: str
    severity: int  # 1–5
    likelihood: int  # 1–5
    rating: int  # severity * likelihood
    controls: Optional[str] = None
    responsible: Optional[str] = None
    due_date: Optional[str] = None  # ISO
    status: str = "Open"  # Open/Closed
    note: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class AuditRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    site: str
    auditor: Optional[str] = None
    date_iso: str
    checklist: str  # JSON string of items + pass/fail/comments
    findings: Optional[str] = None
    actions_raised: int = 0
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class ActionItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    source: str  # Risk/Audit
    source_id: int
    site: str
    title: str
    owner: Optional[str] = None
    due_date: Optional[str] = None
    status: str = "Open"  # Open/Closed
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


def init_db() -> None:
    os.makedirs("data", exist_ok=True)
    SQLModel.metadata.create_all(engine)


def save_previsit(**kwargs) -> int:
    with Session(engine) as s:
        rec = PreVisitRecord(**kwargs)
        s.add(rec)
        s.commit()
        s.refresh(rec)
        return rec.id


def list_previsits(limit: int = 50) -> Iterable[PreVisitRecord]:
    with Session(engine) as s:
        stmt = select(PreVisitRecord).order_by(PreVisitRecord.id.desc()).limit(limit)
        return s.exec(stmt).all()


def get_previsit(pid: int) -> Optional[PreVisitRecord]:
    with Session(engine) as s:
        return s.get(PreVisitRecord, pid)

# Risk helpers
def save_risk(**kwargs) -> int:
    with Session(engine) as s:
        rec = RiskRecord(**kwargs)
        s.add(rec)
        s.commit()
        s.refresh(rec)
        return rec.id

def list_risks(limit: int = 200) -> List[RiskRecord]:
    with Session(engine) as s:
        stmt = select(RiskRecord).order_by(RiskRecord.id.desc()).limit(limit)
        return s.exec(stmt).all()

def close_risk(rid: int) -> None:
    with Session(engine) as s:
        rec = s.get(RiskRecord, rid)
        if rec:
            rec.status = "Closed"
            s.add(rec)
            s.commit()

# Audit helpers
def save_audit(**kwargs) -> int:
    with Session(engine) as s:
        rec = AuditRecord(**kwargs)
        s.add(rec)
        s.commit()
        s.refresh(rec)
        return rec.id

def list_audits(limit: int = 100) -> List[AuditRecord]:
    with Session(engine) as s:
        stmt = select(AuditRecord).order_by(AuditRecord.id.desc()).limit(limit)
        return s.exec(stmt).all()

# Action helpers
def add_action(**kwargs) -> int:
    with Session(engine) as s:
        rec = ActionItem(**kwargs)
        s.add(rec)
        s.commit()
        s.refresh(rec)
        return rec.id

def list_actions(status: Optional[str] = None, limit: int = 100) -> List[ActionItem]:
    with Session(engine) as s:
        stmt = select(ActionItem).order_by(ActionItem.id.desc()).limit(limit)
        if status:
            stmt = select(ActionItem).where(ActionItem.status == status).order_by(ActionItem.id.desc()).limit(limit)
        return s.exec(stmt).all()
