from pydantic import BaseModel
from typing import Optional

class MusicSettings(BaseModel):
    dominant: str = "Acoustic Grand Piano"
    scale_type: str = "Major"
    note_len: int = 32
    volume_mult: float = 1.0
    bpm_mult: float = 1.0
    rhythm_complexity: float = 0.5

class MusicResponse(BaseModel):
    audio_url: str
    bpm: int
    instruments: list[str]
    duration: float
    waveform: Optional[list[float]] = None