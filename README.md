# ImagiTune

An AI-powered system that converts images into music, where colors, shapes, textures, and patterns influence melody, rhythm, and harmony.

## 🔍 Key Features

- **Image Feature Extraction**: Combines low-level features (brightness, edges, color histograms) with high-level features extracted using the pre-trained VGG16 model.
- **MIDI Processing**: Converts MAESTRO MIDI files into structured sequences of notes (pitch, velocity, duration, instrument) for model training.
- **LSTM-Based RNN Model**: Learns to generate expressive musical note sequences conditioned on image features.
- **Music Generation**: Uses a seed and the extracted image features to generate a unique MIDI sequence.
- **Audio Conversion**: Converts MIDI to WAV using FluidSynth and enhances audio with normalization and reverb using PyDub.
- **Output Formats**: Saves output as `.mid`, `.wav`, and `.mp3` files for flexibility and sharing.

## 📦 Requirements

- Python 3.7+
- Libraries: `numpy`, `cv2`, `torch`, `torchvision`, `tensorflow`, `pretty_midi`, `pydub`, `matplotlib`, `scikit-learn`, `Pillow`
- FluidSynth with a valid `.sf2` SoundFont file

## 🚀 How It Works

1. **Extract Image Features**: `extract_image_features()` captures a holistic representation of the input image.
2. **Prepare Training Data**: `prepare_training_data()` converts a subset of MAESTRO MIDI files into RNN-ready sequences.
3. **Train the RNN Model**: `train_rnn()` trains a multi-output LSTM model to predict the next note attributes.
4. **Generate Music**: `generate_music()` synthesizes new notes based on the image and a random seed.
5. **Export Audio**: The generated notes are saved as a MIDI, converted to WAV using FluidSynth, and finalized to MP3 with audio effects.

## 🎧 Example Output

After execution, you'll get:
- A MIDI representation (`generated_music.mid`)
- A WAV audio version (`generated_music.wav`)
- An MP3 file with normalization and reverb effects (`generated_music.mp3`)

## Backend (Planned)
A Node.js/Express backend will be added to handle authentication and user management, using MongoDB for data storage.