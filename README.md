# Rocket Tasks

<div align="center">
  <img src="https://github.com/user-attachments/assets/0c68588c-4c44-4c81-a6fe-6a974df599a5" width="600" alt="app-preview">
</div>

## About The Project

**Rocket Tasks** is a full-stack task management application focused on modern web development practices such as authentication, validation, database modeling, API documentation, responsive user interfaces and containerization.

Users can register, authenticate, create task lists and manage their tasks. Tasks can be filtered, paginated and sorted.

The application is fully containerized with Docker, including both the frontend and backend services.

## Built With

**Core**

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge\&logo=typescript\&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge\&logo=react\&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge\&logo=vite\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2306B6D4.svg?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![React Router](https://img.shields.io/badge/react_router-%23CA4245.svg?style=for-the-badge\&logo=reactrouter\&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge\&logo=shadcnui\&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-%23eeebd4.svg?style=for-the-badge&logo=tanstack&logoColor=black)
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge\&logo=express\&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge\&logo=Prisma\&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge\&logo=zod\&logoColor=white)
![Scalar](https://img.shields.io/badge/Scalar-%23000000.svg?style=for-the-badge\&logo=scalar\&logoColor=white)

**Data**

![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge\&logo=postgresql\&logoColor=white)

**Infrastructure**

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge\&logo=docker\&logoColor=white)
![CloudBeaver](https://img.shields.io/badge/CloudBeaver-%235F6B7A.svg?style=for-the-badge&logo=dbeaver&logoColor=white)

## Features

* User registration and authentication with JWT Bearer tokens
* Task creation and management with due dates, filtering, pagination and sorting
* Task lists with custom colors and descriptions
* Responsive user interface
* User profile management
* Interactive OpenAPI documentation powered by Scalar at `/docs`
* Fully containerized application with Docker

## Prerequisites

* [Docker](https://www.docker.com/) with Docker Compose

## Installation
1. Clone the repository
    ```sh
    git clone https://github.com/murilobispo/rocket-tasks.git
    cd rocket-tasks
    ```
    
2. Set up environment variables
    ```sh
    cp .env.example .env
    ```
 
   Fill in the values in `.env` (see the section below).
 
3. Start all services
    ```sh
    docker compose up --build
    ```
 
   This will start the frontend, backend, PostgreSQL and CloudBeaver services. Database migrations are applied automatically on startup.
 
4. Access the application
   * Frontend: `http://localhost:5173`   
   * API: `http://localhost:3000`
   * API Docs (Scalar): `http://localhost:3000/docs`
   * CloudBeaver (DB client): `http://localhost:8978`

## Environment Variables
 
Copy `.env.example` to `.env` and fill in the values:
 
```env
# PostgreSQL
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=rocket_tasks
POSTGRES_PORT=5432

# CloudBeaver
CLOUDBEAVER_PORT=8978

# Server
SERVER_PORT=3000
JWT_SECRET=your_jwt_secret_here
SALT_ROUNDS=10

# Client
FRONTEND_PORT=5173
```

## Project Structure

```text
rocket-tasks/
│
├── client/                     # React + Vite frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── constants/          # Application constants
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Shared libraries and configuration
│   │   ├── pages/              # Application pages
│   │   ├── routes/             # Route definitions and middleware
│   │   ├── services/           # API and authentication services
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Shared utilities
│   │   ├── index.css
│   │   └── main.tsx            # Application entry point
│   └── Dockerfile
│
├── server/                     # Node.js + Express backend
│   ├── docs/                   # OpenAPI specification
│   ├── prisma/                 # Prisma schema and migrations
│   ├── src/
│   │   ├── config/             # Environment variables and configuration
│   │   ├── controllers/        # Request handlers
│   │   ├── lib/                # Shared libraries and configuration
│   │   ├── middlewares/        # Authentication, validation, error handler
│   │   ├── routes/             # API route definitions
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── services/           # Business logic
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Shared utilities
│   │   ├── app.ts              # Express application configuration
│   │   └── server.ts           # HTTP server entry point
│   └── Dockerfile
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## References

* [Express.js Documentation](https://expressjs.com/)
* [Prisma Documentation](https://www.prisma.io/docs)
* [Scalar Documentation](https://scalar.com/)
* [Vite Documentation](https://vite.dev/guide/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [shadcn/ui Documentation](https://ui.shadcn.com/)
* [React Router Documentation](https://reactrouter.com/)
* [TanStack Query Documentation](https://tanstack.com/query/latest)
* [Folder Structure for Node.js + Express.js Project](https://dev.to/mr_ali3n/folder-structure-for-nodejs-expressjs-project-435l)


## License

MIT
