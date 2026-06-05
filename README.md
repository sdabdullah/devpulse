# DevPulse

**DevPulse** is an internal tech issue and feature tracking system designed to help engineering teams manage bugs, feature requests, and development tasks efficiently. The application provides secure authentication, role-based access control, and issue management capabilities for contributors and maintainers.

## Live URL

🌐 https://devpulse-postgres.vercel.app

---

## Features

* User registration and login with JWT authentication
* Secure password hashing using bcrypt
* Role-based authorization (Maintainer & Contributor)
* Create new issues
* View all issues
* View issue details by ID
* Update existing issues with permission checks
* Delete issues with authorization rules
* PostgreSQL database integration using raw SQL queries
* TypeScript for type safety and maintainability

---

## Tech Stack

### Backend

* Node.js
* TypeScript
* Express.js

### Database

* PostgreSQL
* Raw SQL (`pg`)

### Authentication & Security

* bcrypt
* jsonwebtoken (JWT)

---

## Database Schema Summary

### Users Table

| Column     | Type      | Description               |
| ---------- | --------- | ------------------------- |
| id         | SERIAL    | Primary Key               |
| name       | VARCHAR   | User name                 |
| email      | VARCHAR   | Unique email address      |
| password   | VARCHAR   | Hashed password           |
| role       | VARCHAR   | maintainer or contributor |
| created_at | TIMESTAMP | Creation timestamp        |
| updated_at | TIMESTAMP | Last update timestamp     |

### Issues Table

| Column      | Type      | Description                 |
| ----------- | --------- | --------------------------- |
| id          | SERIAL    | Primary Key                 |
| title       | VARCHAR   | Issue title                 |
| description | TEXT      | Issue details               |
| type        | VARCHAR   | bug, feature, or task       |
| status      | VARCHAR   | open, in_progress, resolved |
| reporter_id | INTEGER   | References users(id)        |
| created_at  | TIMESTAMP | Creation timestamp          |
| updated_at  | TIMESTAMP | Last update timestamp       |

### Relationship

* One user can create many issues.
* Each issue belongs to one user.

---

## Setup


### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env` file in the project root:

```env
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/devpulse

JWT_SECRET=your_jwt_secret
```

### 3. Create PostgreSQL database

```sql
CREATE DATABASE devpulse;
```

### 4. Create database tables

### 5. Start development server

```bash
npm run dev
```

### 6. Build project

```bash
npm run build
```

### 7. Run production build

```bash
npm start
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/signup
```

#### Login User

```http
POST /api/auth/login
```

---

### Issues

#### Create Issue

```http
POST /api/issues
```

#### Get All Issues

```http
GET /api/issues
```

#### Get Single Issue

```http
GET /api/issues/:id
```

#### Update Issue

```http
PATCH /api/issues/:id
```

**Access Rules**

* Maintainer can update any issue.
* Contributor can update only their own issues when status is `open`.

#### Delete Issue

```http
DELETE /api/issues/:id
```