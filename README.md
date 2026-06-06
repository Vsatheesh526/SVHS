# 🎓 School Management Website (React + Express + MySQL)

A full-stack school website with a public site and an admin dashboard.

- **frontend/** — React + Vite + Tailwind CSS (the website + admin panel)
- **backend/** — Node.js + Express + MySQL (REST API + JWT auth + image uploads)

---

## 1. Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MySQL](https://dev.mysql.com/downloads/) 8+ (or MariaDB) running locally

---

## 2. Set up the database

Open a terminal and create the database + tables from the schema file:

```bash
mysql -u root -p < backend/schema.sql
```

This creates a database named `school_db` with all required tables.

---

## 3. Start the backend

```bash
cd backend
cp .env.example .env        # then edit .env with your MySQL password
npm install
npm run seed                # (optional) fills sample data + creates an admin
npm run dev                 # starts API on http://localhost:5000
```

### Default admin (created by `npm run seed`)

```
email:    admin@school.com
password: admin123
```

> If you skip seeding, the **first account you register** on the login page
> automatically becomes the admin.

---

## 4. Start the frontend

Open a **second** terminal:

```bash
cd frontend
cp .env.example .env        # default points to http://localhost:5000/api
npm install
npm run dev                 # starts the site on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 5. Using the admin panel

1. Go to **http://localhost:5173/login**
2. Log in (or register the first account to become admin).
3. You'll be redirected to **/admin** where you can manage:
   Notifications, Results, Achievements, Events, Admissions, Contact Info, and read Messages.
4. Uploaded images are stored in `backend/uploads/` and served at `/uploads/...`.

---

## Project structure

```text
.
├── backend/
│   ├── schema.sql            # MySQL schema
│   └── src/
│       ├── server.js         # Express app
│       ├── db.js             # MySQL connection pool
│       ├── seed.js           # sample data
│       ├── middleware/       # auth (JWT) + uploads (multer)
│       └── routes/           # auth, contact, upload, generic CRUD
└── frontend/
    └── src/
        ├── pages/            # Home, Admissions, Events, Achievements, Contact, Login, Admin
        ├── components/       # navbar, footer, cards, admin managers
        ├── context/          # AuthContext (JWT)
        └── api/client.js     # axios instance
```

## API overview

| Method | Endpoint                  | Access  |
|--------|---------------------------|---------|
| POST   | /api/auth/register        | public  |
| POST   | /api/auth/login           | public  |
| GET    | /api/notifications        | public  |
| GET    | /api/results              | public  |
| GET    | /api/achievements         | public  |
| GET    | /api/events               | public  |
| GET    | /api/admissions           | public  |
| GET    | /api/contact/info         | public  |
| POST   | /api/contact/messages     | public  |
| POST/PUT/DELETE on the above | admin only (Bearer token) |
| GET/DELETE | /api/contact/messages | admin only |
| POST   | /api/upload               | admin only |