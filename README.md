# GoCode Learning Platform 🎓

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Django](https://img.shields.io/badge/Django-REST-green)
![React](https://img.shields.io/badge/React-Vite-blue)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

**GoCode** is a full-stack online learning platform that enables instructors to manage courses and allows students to enroll, learn, and track progress through a modern web interface.

The project is built with **Django REST Framework** on the backend and **React + Vite** on the frontend, with automation scripts to make setup fast and beginner-friendly.

---

## ✨ Features

- 👩‍🏫 Instructor course creation & management
- 🎓 Student enrollment and progress tracking
- 📊 Clean, responsive dashboard UI
- 🔐 RESTful API with Django
- ⚡ Fast frontend using Vite
- 🛠 Automated setup scripts (backend & frontend)

---

## 🖼 Screenshots

![screenshot](docs/screenshots/screenshot-2025-12-30-13-57-45.png)
![screenshot](docs/screenshots/screenshot-2025-12-30-13-58-01.png)

---


## 📑 Table of Contents

- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation Guide](#-installation-guide)
- [Running the Application](#-running-the-application)
- [API Overview](#-api-overview)
- [Troubleshooting](#-troubleshooting)
- [Production Notes](#-production-notes)

---

## 📂 Project Structure

```text
Project_Root/
├── backend/                # Django REST API
│   ├── DBcreate.py         # MySQL database creation script
│   ├── setup.py            # Backend automation script
│   ├── manage.py           # Django entry point
│   └── ...
├── frontend/               # React client
│   ├── setup.py            # Frontend automation script
│   ├── package.json
│   └── ...
├── docs/                   # Documentation & screenshots
└── README.md
```

---

## 🛠 Technology Stack

### Backend
- Python 3.10+
- Django
- Django REST Framework
- MySQL

### Frontend
- Node.js (LTS)
- React
- Vite

---

## ⚙️ Prerequisites

Ensure the following are installed:

- Python 3.10+ (added to PATH)
- Node.js (LTS)
- MySQL Server (running)

---

## 🚀 Installation Guide

### 1️⃣ Database Setup

```bash
cd backend
python DBcreate.py
```

Creates the required MySQL database automatically.

---

### 2️⃣ Backend Setup

```bash
python setup.py
```

Choose **Option 1 – Fresh Start**.

✔ Installs dependencies  
✔ Runs migrations  
✔ Creates admin user  
✔ Starts Django server

Backend runs at:
```
http://127.0.0.1:8000/
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
python setup.py
```

Choose **Option 1 – First Time Setup**.

Frontend runs at:
```
http://localhost:5173/
```

---

## ▶️ Running the Application

Both servers must be running:
- Backend → Port 8000
- Frontend → Port 5173

---

## 🔌 API Overview

Example endpoints:

```http
GET    /api/courses/
POST   /api/courses/
GET    /api/students/
POST   /api/enroll/
```

> Full API documentation can be added later using Swagger or Postman.

---

## 🐞 Troubleshooting

**Migration or database errors**
```bash
python setup.py
# Choose Option 1
```

**Frontend network error**
- Ensure backend is running
- Check correct ports

---

## 🚀 Production Notes

For deployment:
- Use environment variables for secrets
- Configure CORS properly
- Use Gunicorn + Nginx
- Build frontend with `npm run build`

---

## 🤝 Contribution

Contributions are welcome!  
Fork the repo, create a feature branch, and submit a pull request.

---

## 📄 License

This project is for educational purposes. License can be added later.

Happy coding 🚀
