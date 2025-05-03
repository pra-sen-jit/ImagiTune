from fastapi import APIRouter, File, UploadFile, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.concurrency import run_in_threadpool
from ..schemas.music import MusicSettings, MusicResponse
from ..core.music_gen import MusicGenerator
from pathlib import Path
import uuid
import os
import logging
from typing import Optional

router = APIRouter()

# Initialize music generator (configure with your soundfont path)
SOUNDFONT_PATH = os.getenv("SOUNDFONT_PATH", "app/static/soundfonts/FluidR3_GM.sf2")
music_generator = MusicGenerator(SOUNDFONT_PATH)

# Configure logging
logger = logging.getLogger(__name__)

# Define maximum file size as a constant
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB limit

@router.post(
    "/generate", 
    response_model=MusicResponse,
    summary="Generate music from image",
    description="Converts an uploaded image to musical composition based on visual characteristics.",
    responses={
        200: {"description": "Successfully generated music"},
        400: {"description": "Invalid image file"},
        413: {"description": "File too large"},
        500: {"description": "Internal server error during generation"}
    }
)
async def generate_music(
    image: UploadFile = File(..., description="Image file to analyze (JPG/PNG)"),
    settings: Optional[MusicSettings] = None,
):
    print("I am here")
    try:
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only image files are allowed"
            )

        # Generate unique ID for this request
        request_id = str(uuid.uuid4())
        audio_path = Path(f"app/static/audio/{request_id}.wav")
        
        # Ensure directory exists
        audio_path.parent.mkdir(parents=True, exist_ok=True)

        # Read image data with size check
        image_data = await image.read()
        if len(image_data) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File exceeds maximum size of {MAX_FILE_SIZE} bytes"
            )

        logger.info(f"Starting music generation for request {request_id}")

        # Process using threadpool for CPU-bound tasks
        result = await run_in_threadpool(
            music_generator.generate_from_image,
            image_data,
            settings.dict() if settings else {},
            request_id
        )

        logger.info(f"Successfully generated music for request {request_id}")

        return {
            "audio_url": f"/api/v1/music/audio/{request_id}.wav",  # Use API endpoint
            "bpm": result["bpm"],
            "instruments": result["instruments"],
            "duration": result["duration"],
            "waveform": result.get("waveform", []),
            "hue_histogram": result.get("hue_hist", [])
        }

    except HTTPException:
        raise  # Re-raise existing HTTP exceptions
    except Exception as e:
        logger.error(f"Music generation failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Music generation failed. Please try again."
        )

@router.get(
    "/audio/{filename}",
    response_class=FileResponse,
    summary="Retrieve generated audio",
    responses={
        200: {
            "description": "Audio file",
            "content": {"audio/wav": {}}
        },
        404: {"description": "Audio file not found"}
    }
)
async def get_audio(
    filename: str,
    download: bool = False
):
    audio_path = Path(f"app/static/audio/{filename}")
    
    # Security check - prevent directory traversal
    if not audio_path.is_file() or ".." in filename:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Audio file not found"
        )

    headers = {}
    if download:
        headers["Content-Disposition"] = f'attachment; filename="{filename}"'

    return FileResponse(
        audio_path,
        media_type="audio/wav",
        headers=headers
    )