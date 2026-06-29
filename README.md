# Salon Fullstack Application

A complete production-ready full-stack application for a salon, built with React, Vite, Node.js, Express, and Supabase (PostgreSQL).

## Project Structure
```
project-root/
├── frontend/             # React application (UI)
│   ├── src/              # Frontend source code
│   └── public/           # Static assets
├── backend/              # Express server (API & Business Logic)
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Auth and file upload middleware
│   ├── routes/           # API routes definitions
│   ├── database/         # Supabase SQL schema & seed scripts
│   ├── uploads/          # Local file storage for images
│   └── utils/            # DB connection utilities
├── ecosystem.config.cjs  # PM2 configuration for deployment
├── nginx.conf.example    # Nginx configuration example
├── DEPLOYMENT.md         # Step-by-step deployment guide
└── package.json          # Root monorepo scripts
```

## Features
- **Public Website**: Beautiful, responsive single-page landing site for the salon (preserved from the original design).
- **Dynamic Content**: Services, Packages, Gallery, Testimonials, and Contact Info are all driven by the database.
- **Booking System**: Customers can request appointments directly from the website.
- **Admin Dashboard**: Protected route (`/admin`) for managing the salon.
    - JWT Authentication with bcrypt password hashing.
    - Dashboard statistics.
    - Full CRUD for Appointments, Services, Packages, Gallery, and Testimonials.
    - Business Settings and Working Hours configuration.
    - Image uploads using `multer`.

## Local Development

### 1. Database Setup (Supabase)
1. Create a new Supabase project.
2. Go to the SQL Editor and run the script located at `backend/database/sql/schema.sql` to create all tables.
3. Run the script located at `backend/database/sql/seed.sql` to insert the initial admin user and default settings.

### 2. Environment Variables
In `backend/`, copy `.env.example` to `.env` and fill in the values:
```
PORT=5000
JWT_SECRET=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
UPLOAD_PATH=uploads/
NODE_ENV=development
```
In `frontend/`, copy `.env.example` to `.env`. It defaults to `http://localhost:5000/api`.

### 3. Install & Run
From the root directory:
```bash
# Install root dependencies
npm install

# Install frontend and backend dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Run both frontend and backend concurrently
# command: npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Admin login: http://localhost:3000/admin/login
  - Default Admin Email: `admin@cielbeauty.com`
  - Default Admin Password: `admin123`

## Production Deployment
See `DEPLOYMENT.md` for full AWS EC2 deployment instructions.
