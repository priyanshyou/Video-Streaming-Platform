# 🎬 VideoStream  
### Full-Stack Video Streaming & Processing Platform

A **production-grade video streaming platform** built using **Node.js, Express, MongoDB, and React**.  
It supports **real-time video processing, intelligent content analysis, and adaptive streaming** using HTTP Range Requests.

![License](https://img.shields.io/github/license/realShailendra/Video-Streaming-Platforms?style=flat-square)
![Node](https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/database-MongoDB-blue?style=flat-square)
![Status](https://img.shields.io/badge/status-Active-brightgreen?style=flat-square)

---

## 🌟 What makes VideoStream special?

Unlike basic upload-and-play apps, **VideoStream** is built like a **real OTT backend** — handling video processing, intelligent safety checks, and scalable streaming.

It is designed with **performance, security, and production-readiness** in mind.

---

## ✨ Core Features

### 🎥 Smart Video Upload & Processing
- Automatic extraction of:
  - Duration
  - Format
  - Resolution
- Thumbnail generation using **FFmpeg**

### 🛡️ Sensitivity Analysis
- Heuristic-based scanning system
- Assigns a **Safety Score** to each video
- Flags potentially sensitive content

### 📡 High-Performance Streaming
- Supports **HTTP Range Requests**
- Enables:
  - Instant seeking
  - Buffer-free playback
  - Progressive loading

### 📊 Live Processing Dashboard
- Real-time updates via **Socket.io**
- Shows:
  - Upload progress
  - Processing status
  - Errors & completion state

### 🔐 Secure Authentication
- JWT-based login
- Password hashing using **Bcrypt**
- Protected APIs

### ☁️ Hybrid Storage
- Local file storage
- Cloudinary cloud support

### 🎨 Premium UI
- Built with **React + Tailwind CSS**
- Dark theme with smooth animations

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| Realtime | Socket.io |
| Video Engine | FFmpeg |
| Security | JWT, Bcrypt, Helmet |

### Frontend
| Layer | Technology |
|------|-----------|
| Framework | React (Vite) |
| Styling | Tailwind CSS |
| State | Context API |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

---

### Clone the repository
```bash
git clone https://github.com/realShailendra/Video-Streaming-Platforms.git
cd Video-Streaming-Platforms
```

---

### Install dependencies
```bash
install.bat
```

---

### Configure Environment
Create `.env` in `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/videostream
JWT_SECRET=super_secret_key

# Optional Cloudinary
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

### Run the application
```bash
start.bat
```

Frontend:
```
http://localhost:5173
```

Backend:
```
http://localhost:5000
```

---

## 📁 Project Structure

```text
Video-Streaming-Platforms
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── uploads/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── contexts/
│       └── services/
│
└── start.bat
```

---

## 🤝 Contributing
Pull requests are welcome.

---

  

Built with ❤️ for real-world scalable video platforms.
