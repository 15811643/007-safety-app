from pydantic import BaseModel, field_validator
from typing import Optional

class PreVisit(BaseModel):
    site: str
    crew_size: int
    confined_space: bool
    attendant: Optional[str] = None
    materials: Optional[str] = None
    hazards: Optional[str] = None
    date_iso: str
    created_by: Optional[str] = None

    @field_validator("attendant")
    @classmethod
    def require_attendant(cls, v, info):
        bound = info.data
        if bound.get("confined_space") and not v:
            raise ValueError("Confined Space Attendant is required when confined space is selected.")
        return v
