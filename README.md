# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).



# Job Portal – Full Stack Web Application

A full-stack Job Portal application built with FastAPI, React.js, and PostgreSQL. The platform enables recruiters to post and manage jobs while allowing job seekers to search, apply, and track applications through a secure, role-based system.

---

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Recruiter & Job Seeker)
- Secure password hashing
- Protected API endpoints

### Job Management
- Create, update, delete, and view job postings
- Search and filter jobs
- View detailed job information

### Company Management
- Recruiters can create and manage company profiles
- Full CRUD operations for companies

### Job Applications
- Apply for jobs
- Track submitted applications
- Recruiters can review applicants

### Recruiter Dashboard
- View total jobs posted
- View application statistics
- Hiring analytics and recruiter insights

### API Documentation
- Interactive Swagger UI

---

# Tech Stack

## Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Axios

## Backend
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Alembic
- Uvicorn

## Database
- PostgreSQL

## Deployment & DevOps
- Docker
- Docker Compose
- AWS EC2 *(Deployment in Progress)*

## Tools
- Git
- GitHub
- VS Code
- Swagger UI

---

# Project Structure

```text
Fastapi_Job_Portal/
│
├── Backend/
│   ├── app/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .dockerignore
│   └── ...
│
├── Frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   ├── .dockerignore
│   └── ...
│
├── docker-compose.yml
└── README.md
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git

cd Fastapi_Job_Portal
```

---

# Backend Setup

```bash
cd Backend

python -m venv virt

virt\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside the **Backend** folder.

Example:

```env
APP_NAME=Job Portal
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=your_database_url
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

---

# Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

# Docker Setup

## Build and Start Containers

```bash
docker compose up
```

## Start in Detached Mode

```bash
docker compose up -d
```

## Rebuild Images

```bash
docker compose up --build
```

## Stop Containers

```bash
docker compose down
```

---

# API Documentation

Once the backend is running, open:

```
http://localhost:8000/docs
```

---

# Screenshots

Add screenshots of your application here.

```
screenshots/
│
├── home.png
├── login.png
├── jobs.png
├── companies.png
├── applications.png
└── dashboard.png
```

Example:

```markdown
![Home](screenshots/home.png)

![Dashboard](screenshots/dashboard.png)
```

---

# Future Enhancements

- Deploy on AWS EC2
- Configure Nginx Reverse Proxy
- Implement CI/CD Pipeline
- Email Notifications
- Resume Upload
- Saved Jobs
- Interview Scheduling

---

# Author

**Keerthan Gowda C**

- GitHub: https://github.com/keerthan-gowda-c
- LinkedIn: https://www.linkedin.com/in/keerthan-gowda-c/

---

# License

This project is created for learning, portfolio, and demonstration purposes.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
