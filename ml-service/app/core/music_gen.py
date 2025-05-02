import cv2
import numpy as np
from music21 import stream, note, chord, midi, tempo, instrument
from midi2audio import FluidSynth
import tempfile
import os
from pathlib import Path
from ..config import settings

# Keep your existing constants and helper functions
INSTRUMENT_MAP = {...}
SCALE_MODES = {...}

class MusicGenerator:
    def __init__(self):
        self.fs = FluidSynth(settings.SOUNDFONT_PATH)
        os.makedirs("app/static/audio", exist_ok=True)

    async def generate_from_image(self, image_data, params, request_id):
        try:
            # Convert image bytes to numpy array
            img = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

            # Your existing processing logic
            hue_hist, sat, val, edge_dens, tex = extract_features(img)
            energy = np.clip(edge_dens + tex/10000, 0.0, 1.0)
            
            # ... (rest of your music generation logic)

            # Save output
            output_path = f"app/static/audio/{request_id}.wav"
            self.save_output(score, output_path)
            
            return {
                "bpm": bpm,
                "instruments": instruments,
                "duration": total_duration,
                "waveform": waveform
            }
            
        except Exception as e:
            raise RuntimeError(f"Music generation failed: {str(e)}")

    def save_output(self, score, output_path):
        with tempfile.TemporaryDirectory() as tmpdir:
            midi_path = Path(tmpdir) / "temp.mid"
            self.save_midi(score, midi_path)
            self.midi_to_wav(midi_path, output_path)

    def save_midi(self, score, path):
        mf = midi.translate.streamToMidiFile(score)
        mf.open(str(path), 'wb')
        mf.write()
        mf.close()

    def midi_to_wav(self, midi_path, wav_path):
        self.fs.midi_to_audio(str(midi_path), str(wav_path))

# Initialize generator
music_generator = MusicGenerator()

async def generate_music_from_image(image_data, params, request_id):
    return await music_generator.generate_from_image(image_data, params, request_id)