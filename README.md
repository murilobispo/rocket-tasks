# Rocket Tasks

<div align="center">
  <img src="https://github.com/user-attachments/assets/41c303aa-bd69-4736-ac18-8c4a4c98ec1d" width="600" alt="app-preview">
</div>

## About The Project

**Rocket Tasks** is a fullstack task management API built for study purposes, focusing on modern backend development practices such as authentication, validation, database modeling, API documentation and containerization.

Users can register, authenticate, create task lists and manage their tasks with filtering, pagination and sorting.

> 🚧 Frontend under development — follow progress on the `feat/frontend` branch.


## Built With

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Scalar](https://img.shields.io/badge/Scalar-%23000000.svg?style=for-the-badge&logo=scalar&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Features

* RESTful API with JWT authentication via Bearer token
* User profile management
* Tasks with due date, filtering, pagination and sorting
* Task lists with color and description
* Interactive OpenAPI documentation powered by Scalar at `/docs`

## Prerequisites
* [Docker](https://www.docker.com/) + Docker Compose
  
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
 
   This will start PostgreSQL, CloudBeaver and the API server. Migrations are applied automatically on startup.
 
4. Access the API
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
```

    
## Project Structure
```
rocket-tasks/
├── server/                     # Node.js + Express backend
│   ├── src/
│   │   ├── config/             # Environment variables and configuration
│   │   ├── controllers/        # Request handlers
│   │   ├── middlewares/        # Authentication, validation, error handler
│   │   ├── routes/             # API route definitions
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── services/           # Business logic
│   │   ├── types/              # TypeScript types
│   │   └── utils/              # Shared utilities
│   ├── prisma/                 # Prisma schema and migrations
│   ├── docs/                   # OpenAPI specification
│   └── Dockerfile
├── client/                     # Frontend (coming soon)
├── docker-compose.yml
├── .env.example
└── README.md
```
## References

* [Express.js Documentation](https://expressjs.com/)
* [Prisma Documentation](https://www.prisma.io/docs)
* [Scalar Documentation](https://scalar.com/)
* [Folder Structure for Node.js + Express.js Project](https://dev.to/mr_ali3n/folder-structure-for-nodejs-expressjs-project-435l)

## License

MIT
