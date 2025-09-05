from typing import Optional, Iterable
from sqlmodel import SQLModel, Field, create_engine, Session, select
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
