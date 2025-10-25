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

### 🔧 Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/7deb/Code_compiler.git
cd Code_compiler

# 2. Create .env and add ur postgres database connection strings ports for running ur backend server etc etc 
touch .env 

# 3. Start all services
docker compose up --build

# 4. to stop the containers
docker compose down

# 5. also run the below commands 
docker build -t code_runner_cpp:latest ./src/docker/cpp
docker build -t code_runner_python:latest ./src/docker/python
```

### Manual Setup 
- Manual (non-Docker) setup instructions will be added soon.

