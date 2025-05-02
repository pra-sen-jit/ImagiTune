from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routes import music

app = FastAPI(title="ImagiTune ML API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",  # Vite dev server
        "https://your-production-domain.com"  # Add production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for audio output
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Include routes
app.include_router(music.router, prefix="/api/v1/music", tags=["music"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}