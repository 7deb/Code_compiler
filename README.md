# 🧠 Code Compiler 

The Code Compiler is a secure and scalable code execution platform built with **Node.js**, **TypeScript**, **PostgreSQL**, **Prisma**, and **Docker** **nginx**. It supports dynamic code execution for **C++** and **Python** using containerized runners.

---

## ⚡ Features

- ✨ Compile & execute user-submitted C++ and Python code
- 🧪 Safe code execution using Docker containers
- 🐘 PostgreSQL + Prisma ORM
- 🚀 TypeScript + Express server
- 🔐 JWT-based authentication
- 🌐 Nginx reverse proxy for routing and load balancing 

## 🚀 Getting Started

You can run this backend using **Docker** (recommended) or **manually** on your local machine.

---

## 🐳 Option 1: Docker Setup (Recommended)

### ✅ Prerequisites

- Install [Docker](https://www.docker.com/products/docker-desktop)
- Clone the repository
- add .env in the root folders and server/ folders 

### .env (root folder)
```
DATABASE_URL=
DB_USER
DB_PASSWORD=
DB_NAME=
```

### .env (server)
```
PORT=
DATABASE_URL=
DB_USER
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```


### 🔧 Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/7deb/Code_compiler.git
cd Code_compiler

# 2. Start all services
docker compose up --build

# 3. to stop the containers
docker compose down


```

### Manual Setup 
- Manual (non-Docker) setup instructions will be added soon.

