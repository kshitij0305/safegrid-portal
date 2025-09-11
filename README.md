# SafeGrid Portal

Full-stack job portal (Employees, Employers, Admin).  
**Backend:** Node, Express, Prisma, PostgreSQL  
**Frontend:** React

## Quick start
### Backend
cd backend
npm install
copy .env.example to .env and set DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run dev

### Frontend
cd frontend/safegrid-frontend
npm install
npm start

## Live demo
(add your Render / Vercel links here)

## API endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/jobs
- POST /api/jobs
- POST /api/jobs/:id/apply

## Author
Kshitij Mittal
