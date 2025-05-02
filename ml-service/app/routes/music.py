from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse
from ..schemas.music import MusicSettings, MusicResponse
from ..core.music_gen import generate_music_from_image
import uuid
import os

router = APIRouter()

@router.post("/generate", response_model=MusicResponse)
async def generate_music(
    image: UploadFile = File(...),
    settings: MusicSettings = None
):
    try:
        # Generate unique ID for this request
        request_id = str(uuid.uuid4())
        
        # Call music generation core
        result = await generate_music_from_image(
            image.file,
            settings.dict() if settings else {},
            request_id
        )
        
        return {
            "audio_url": f"/static/audio/{request_id}.wav",
            "bpm": result["bpm"],
            "instruments": result["instruments"],
            "duration": result["duration"],
            "waveform": result["waveform"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/audio/{filename}")
async def get_audio(filename: str):
    audio_path = f"app/static/audio/{filename}"
    if not os.path.exists(audio_path):
        raise HTTPException(status_code=404, detail="Audio file not found")
    return FileResponse(audio_path)