# Task Management System

A simple full-stack Task Management System built for a real-time Week 3 project simulation.

## Features
- User registration and login
- Task creation, assignment, tracking, and completion updates
- Frontend and backend integration
- Database support for MySQL and SQLite
- Error handling and clean project structure

## Tech Stack
- **Backend:** Flask, SQLAlchemy
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MySQL (primary for submission) or SQLite (quick local run)

## Project Structure
```text
Task_Management_System/
├── backend/
├── frontend/
├── database/
├── docs/
└── README.md
```

## How to Run

### 1. Backend setup
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python app.py
```

### 2. Choose database
By default the project runs with SQLite for easy local testing.

To use **MySQL**:
1. Create database using `database/schema.sql`
2. Open `.env`
3. Change:
```env
DB_TYPE=mysql
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=task_management_system
```

### 3. Frontend setup
Open `frontend/index.html` in the browser.

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/<id>`
- `DELETE /api/tasks/<id>`
- `GET /api/users`

## Sample Agile Updates
- Day 1: Set up project structure and database design
- Day 2: Developed registration and login APIs
- Day 3: Implemented task assignment and tracking module
- Day 4: Integrated frontend with backend APIs
- Day 5: Performed testing, bug fixes, and documentation

## Submission Deliverables
- Functional project module
- Code repository
- Team collaboration updates
