# 🔧 Youtube Downloader – Backend (Node.js)

API backend sederhana untuk mendownload video dan audio dari YouTube dalam format MP3 dan MP4. Menggunakan teknologi `Node.js`, `Express`, `ytdl-core`, dan `ffmpeg`, serta siap diintegrasikan dengan frontend manapun.

## 🚀 Fitur

- Endpoint download MP3 dan MP4 via query parameter
- Integrasi `ytdl-core` untuk streaming YouTube
- Konversi audio/video dengan `ffmpeg`
- Validasi URL YouTube sebelum proses
- Response otomatis untuk file download

## 🧰 Tech Stack

| Bagian      | Teknologi             |
|-------------|------------------------|
| Server      | Node.js, Express       |
| Download    | ytdl-core              |
| Konversi    | ffmpeg-static          |

## 📦 Struktur Project
├── controllers/ │ └── downloadController.js ├── routes/ │ └── downloadRoutes.js ├── utils/ │ └── converter.js ├── index.js ├── package.json


## ⚙️ API Endpoint

### 🎵 Download MP3
GET /<your_url>/mp3?url=<YouTube_URL>

- Response: File MP3
- Format audio: 128kbps (default) / bisa lebih besar tergantung video youtube nya.

### 🎥 Download MP4
GET /<your_url>/highestmp4?url=<YouTube_URL>
- Response: File MP4
- Format video: 720p / 480p tergantung sumber.

## 📥 Cara Install

```bash
git clone https://github.com/iso8king/youtube_downloader.git
cd youtube_downloader
npm install
npm start
```
>Pastikan ffmpeg sudah ter-install di server kamu

Terima Kasih Sudah Berkunjung!
