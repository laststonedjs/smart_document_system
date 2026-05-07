# Smart Document Processing System  

---

## Overview

This project is a full-stack document processing system that ingests business documents (Invoices & Purchase Orders), extracts structured data, validates it, and provides an interactive interface for review and correction.

The system is designed to handle **real-world imperfect data**, including OCR-based inputs. 

## Input Data

- PDF documents (clean and semi-structured)
- Images (including messy / OCR-like)
- CSV files (structured)
- TXT files (semi-structured)

---

## Tech Stack

### Frontend
- React
- Axios

### Backend
- Node.js
- Express

### Database
- MongoDB (Mongoose)

### OCR
- Tesseract.js

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/laststonedjs/smart-document-system.git

2. Backend Setup
cd server
npm install

Create .env file:

MONGO_URI=mongodb_connection_string
PORT=5000

Run server:
node src/app.js

3. Frontend Setup
cd client/smart-document
npm install
npm run dev

Frontend runs on:
http://localhost:5173

Backend runs on:
http://localhost:5000

```

API Endpoints
Upload
```bash
POST /api/upload/pdf
POST /api/upload/image
POST /api/upload/txt
POST /api/upload/csv
```
Documents
```bash
GET /api/documents
POST /api/documents
PUT /api/documents/:id
```

### Example Workflow
- Upload document
- System extracts raw text
- Data is structured and validated
- Issues are highlighted
- User edits incorrect fields
- Document is saved and marked as validated

### Notes
- Some test documents contain intentional errors
- The system is designed to detect and report inconsistencies

### Future Improvements
- Due date parsing
- Authentication system
- Role-based review workflow
- Better OCR accuracy tuning
- Export (PDF, CSV, Excel)

### AI Usage

AI tools (ChatGPT, Gemini AI) were used for:

- Debugging
- Googling things
- Code optimization

All implementation details are fully understood.

Live App: (https://smart-document-system-zeta.vercel.app/)
