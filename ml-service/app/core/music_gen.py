# app/core/music_gen.py
import cv2
import numpy as np
from music21 import stream, note, chord, midi, tempo, instrument
from midi2audio import FluidSynth
import tempfile
import os
from pathlib import Path
import itertools
import asyncio
from typing import Dict, Any

# === Original Constants Preserved ===
INSTRUMENT_MAP = {
  "Acoustic Grand Piano": 0,
  "Electric Guitar (jazz)": 26,
  "Acoustic Guitar (nylon)": 24,
  "Violin": 40,
  "Trumpet": 56,
  "Alto Sax": 65,
  "Flute": 73,
  "Synth Pad": 88,
  "Steel Drums": 114,
  "Drum Kit": 118
}

SCALE_MODES = {
  "Major": [0, 2, 4, 5, 7, 9, 11],
  "Natural Minor": [0, 2, 3, 5, 7, 8, 10],
  "Pentatonic": [0, 3, 5, 7, 10],
  "Blues": [0, 3, 5, 6, 7, 10],
  "Dorian": [0, 2, 3, 5, 7, 9, 10]
}

class MusicGenerator:
  def __init__(self, soundfont_path: str):
    self.soundfont_path = soundfont_path
    self.fs = FluidSynth(soundfont_path)
    os.makedirs("app/static/audio", exist_ok=True)

  # === Your Original Functions Preserved ===
  def extract_features(self, img: np.ndarray) -> tuple:
    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    hue_hist = cv2.calcHist([hsv], [0], None, [12], [0,180])
    hue_hist = cv2.normalize(hue_hist, hue_hist).flatten()
    sat = np.mean(hsv[:,:,1])
    val = np.mean(hsv[:,:,2])
    edges = cv2.Canny(gray,100,200)
    edge_dens = np.sum(edges>0)/edges.size
    texture = np.var(gray)
    return hue_hist, sat, val, edge_dens, texture

  def get_scale(self, mode: str, root: int = 60) -> list:
    return [root + i for i in SCALE_MODES[mode]]

  def get_chord_progression(self, scale: list) -> list:
    degrees = [0,4,5,3]
    return [[scale[d], scale[(d+2)%len(scale)], scale[(d+4)%len(scale)]] 
            for d in degrees]

  def save_midi(self, score_obj: stream.Score, path: Path):
    mf = midi.translate.streamToMidiFile(score_obj)
    mf.open(str(path), 'wb')
    mf.write()
    mf.close()

  def midi_to_wav(self, midi_path: Path, wav_path: Path):
    self.fs.midi_to_audio(str(midi_path), str(wav_path))

  # === Async-Compatible Generation Function ===
  async def generate_from_image(
    self,
    image_data: bytes,
    params: Dict[str, Any],
    request_id: str
  ) -> Dict[str, Any]:
    """Adapted version of your Streamlit logic"""
    try:
      # Convert image bytes to numpy array
      img = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)
      if img is None:
        raise ValueError("Invalid image data - could not decode")
      img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

      # === Your Original Processing Logic ===
      hue_hist, sat, val, edge_dens, tex = self.extract_features(img)
      energy = np.clip(edge_dens + tex/10000, 0.0, 1.0)
      
      # Map energy to BPM and apply multiplier
      bpm_raw = np.interp(energy, [0.0, 1.0], [40, 180])
      bpm = int(bpm_raw * params.get('bpm_mult', 1.0))
      
      # Volume calculation
      base_vol_raw = np.clip((val/255)*127, 30, 120)
      base_vol = int(base_vol_raw * params.get('volume_mult', 1.0))
      
      # Note density from energy
      note_density = np.interp(energy, [0.0, 1.0], [0.1, 1.0])
      
      # Rhythm complexity handling
      rhythm_complexity = params.get('rhythm_complexity', 0.5)
      comp = np.clip(
          (1-energy) * rhythm_complexity + energy * (1-rhythm_complexity),
          0.0, 1.0
      )
      
      if comp < 0.3:
          rhythm_seq = [4.0, 2.0]
      elif comp < 0.7:
          rhythm_seq = [2.0, 1.0, 0.5]
      else:
          rhythm_seq = [1.0, 0.5, 0.25]

      # Scale & progression
      root = 48 + (np.argmax(hue_hist) % 24)
      scale = self.get_scale(params.get('scale_type', 'Major'), root)
      chord_prog = self.get_chord_progression(scale)

      # Motif generation (original logic preserved)
      motif_len = 8
      idf = np.log(1/(hue_hist+1e-6)) + 1
      tfidf = hue_hist * idf
      tfidf /= tfidf.sum()
      weights = tfidf[:len(scale)]
      weights /= weights.sum()
      base_motif = np.random.choice(scale, motif_len, p=weights)

      # Score construction
      effective_len = int(params.get('note_len', 32) * note_density * 4)
      bars = effective_len // 4
      bars_chords = [chord_prog[i % len(chord_prog)] for i in range(bars)]

      score = stream.Score()
      score.append(tempo.MetronomeMark(number=bpm))
      
      # Chord part
      chord_part = stream.Part()
      chord_part.append(instrument.Piano())
      chord_part.append(tempo.MetronomeMark(number=bpm))
      
      for tones in bars_chords:
        c = chord.Chord([note.Note(p) for p in tones])
        c.duration.quarterLength = 4.0
        c.volume.velocity = int(base_vol * 0.5)
        chord_part.append(c)
      
      score.insert(0, chord_part)

      # Instrument handling
      dominant = params.get('dominant', 'Acoustic Grand Piano')
      support = list(np.random.choice(
          [i for i in INSTRUMENT_MAP if i != dominant],
          3,
          replace=False
      ))
      instruments = [dominant] + support
      transpositions = [0, 3, -3, 7]

      # Create instrument parts
      for idx, instr_name in enumerate(instruments):
        part = stream.Part()
        part.append(tempo.MetronomeMark(number=bpm))
        part.append(instrument.instrumentFromMidiProgram(INSTRUMENT_MAP[instr_name]))
        
        trans = transpositions[idx]
        vol = int(base_vol * (1.2 - idx * 0.3))
        total_q = 0.0
        motif_idx = 0
        rhythm_iter = itertools.cycle(rhythm_seq)
        
        while total_q < effective_len:
            dur = next(rhythm_iter)
            if total_q + dur > effective_len:
                dur = effective_len - total_q
            
            p = base_motif[motif_idx % motif_len] + trans
            n = note.Note(p)
            n.quarterLength = dur
            n.volume.velocity = vol
            part.append(n)
            
            total_q += dur
            motif_idx += 1
        
        score.insert(0, part)

      # Save output
      output_path = Path(f"app/static/audio/{request_id}.wav")
      with tempfile.TemporaryDirectory() as tmpdir:
        midi_path = Path(tmpdir) / "temp.mid"
        self.save_midi(score, midi_path)
        self.midi_to_wav(midi_path, output_path)

      return {
        "bpm": bpm,
        "instruments": instruments,
        "duration": effective_len / 4 * (60 / bpm),  # in seconds
        "hue_hist": hue_hist.tolist(),
        "waveform": self._generate_waveform_preview(output_path)
      }

    except Exception as e:
      raise RuntimeError(f"Image processing failed: {str(e)}")

  def _generate_waveform_preview(self, wav_path: Path) -> list:
    """Generate simplified waveform for visualization"""
    # Implement your waveform analysis here
    return []  # Return array of normalized values between -1 and 1