# HRMS Assignment Submission

## Setup Instructions

### Backend
```bash
cd Backend
npm install
```

Create `.env`

```env
APP_PORT=5001
DATABASE_URL=mysql://payroll_app:<pass>@<host>:<port>/db_penggajian3
SESS_SECRET=8fK#29xLmP$qR7vN!zT4
```

Important: Please keep the env values the same, especially `SESS_SECRET`, as seeded admin credentials were generated against this setup.

Create image upload folder:

```bash
mkdir -p public/images
```

Run backend:

```bash
npm start
```

### Database
Convert dump:

```bash
iconv -f UTF-16LE -t UTF-8 db_penggajian3.sql > clean_dump.sql
```

Import:

```bash
sudo mysql db_penggajian3 < clean_dump.sql
```

Seed login:

Username: aldi  
Password: 123456

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

## Which HRMS I Chose and Why
I chose the React + Node payroll HRMS because it already had modular employee, attendance, payroll and reporting flows that made it a good base for extending with overtime and ticket fixes.

## AI Tools Used and For What
I used ChatGPT primarily to:
- understand the codebase structure faster
- help write frontend changes matching the existing UI patterns
- assist with some models/schema additions

All AI-generated responses were reviewed and checked thoroughly before implementation.

## Ticket Handled Differently
LF-105 referenced a salary column in the employee list, but this HRMS does not have a salary column on that screen.

I interpreted it as a mobile responsiveness issue for the employee list table generally, and implemented the responsive fix accordingly.
