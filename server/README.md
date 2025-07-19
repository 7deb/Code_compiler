# 🧠 Online Code Compiler Backend

This is the backend for an online code execution platform, built with **Node.js**, **TypeScript**, **PostgreSQL**, **Prisma**, and **Docker**. It supports dynamic code execution for **C++** and **Python** using containerized runners.

---

## ⚡ Features

- ✨ Compile & execute user-submitted C++ and Python code
- 🧪 Safe code execution using Docker containers
- 🐘 PostgreSQL + Prisma ORM
- 🚀 TypeScript + Express server
- 🔐 JWT-based authentication
- 🐳 Full Docker support

---

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

# 2. Create .env from the example
cp .env.example .env

# 3. Start all services
docker compose up --build

# 4. to stop the containers
docker compose down

# 5. also run the below commands 
docker build -t code_runner_cpp:latest ./src/docker/cpp
docker build -t code_runner_python:latest ./src/docker/python
