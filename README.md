# Automatic Timetable Generator

A full-stack web application that automatically generates optimized college timetables for students and faculty while avoiding scheduling conflicts. The system manages sections, subjects, faculty allocation, theory/lab scheduling, and displays dynamic timetables through an interactive React interface.

# 📌 Features
```
Automatic timetable generation
Student timetable display
Faculty timetable display
Conflict-free scheduling
Theory and lab slot allocation
Faculty subject assignment
MongoDB database integration
REST API backend
Responsive React UI
Dynamic timetable rendering
```
# 🛠 Tech Stack
```
Frontend
React.js
Axios
CSS

Backend
Node.js
Express.js

Database
MongoDB
Mongoose
```
# 📂 Project Structure
```
Correct Structure For Your Project
timetable-generator/
│
├── backend/
│   │
│   ├── models/
│   │   ├── Faculty.js
│   │   ├── Subject.js
│   │   ├── Section.js
│   │   └── Timetable.js
│   │
│   ├── routes/
│   │   ├── facultyRoutes.js
│   │   ├── subjectRoutes.js
│   │   ├── sectionRoutes.js
│   │   └── timetableRoutes.js
│   │
│   ├── utils/
│   │   └── generateTimetable.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   │
│   │   ├── Login.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── package.json
│   └── node_modules/
│
└── README.md
```
# ⚙️ Installation

### 1️⃣ Clone Repository
```
git clone <repository-url>
cd timetable-generator
🔧 Backend Setup
Install Dependencies
cd backend
npm install
Start Backend
npm start

Server runs on:

http://localhost:5000
```
### 💻 Frontend Setup
```
Install Dependencies
cd frontend
npm install
Start Frontend
npm start

Frontend runs on:

http://localhost:3000
```
# 🧠 Timetable Generation Logic
```
The system:

Fetches sections and subjects
Validates faculty allocation
Allocates subjects into slots
Prevents faculty clashes
Handles lab/theory scheduling
Generates student timetable
Stores data in MongoDB
```
# 🔄 Workflow
```
User Inputs Data
        ↓
Store in MongoDB
        ↓
Generate Timetable
        ↓
Apply Constraints
        ↓
Create Student Timetable
        ↓
Create Faculty Timetable
        ↓
Display on Frontend
```
# 🚫 Constraints Handled
```
No faculty overlap
No duplicate subject slots
Separate lab scheduling
Valid faculty assignment
Fixed working days
Break period handling
```
# 📸 Future Enhancements
```
PDF export
Excel export
Authentication system
AI-based optimization
Drag-and-drop editing
Admin dashboard
```
