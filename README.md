# 🎓 School Management System

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-green)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-4-purple)
![Kafka](https://img.shields.io/badge/Apache_Kafka-7.5.0-black)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

A modern, full-stack web application designed to streamline school administration. Built with a **Microservices Architecture**, this system ensures scalability, fault tolerance, and a premium user experience.

---

## 📑 Table of Contents
- [Introduction](#-introduction)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Fault Tolerance](#-fault-tolerance--resilience)
- [Project Structure](#-project-structure)
- [Installation & Running](#-installation--running)
- [Usage](#-usage)
- [Contributing](#-contributing)

---

## 🚀 Introduction

The **School Management System** leverages the power of **Spring Boot** and **React** to provide a comprehensive solution for educational institutions. It moves beyond monolithic limitations by adopting a distributed microservices approach, ensuring that each component (School, Teacher, Class, Student) operates independently yet cohesively.

## ✨ Features

-   **🔐 Secure Authentication**: Centralized security via API Gateway using Spring Security (Basic Auth).
-   **📊 Interactive Dashboard**: Real-time analytics with visual charts and quick action shortcuts.
-   **⚡ Event-Driven Architecture**: Asynchronous communication between services using **Apache Kafka**.
-   **🛡️ Fault Tolerance**: Resilient system design with **Resilience4j** Circuit Breakers and Fallback mechanisms.
-   **🎨 Premium UI/UX**: Modern Glassmorphism design, responsive layout, and smooth animations.
-   **🔍 Service Discovery**: Dynamic service registration and discovery using **Netflix Eureka**.
-   **🚪 API Gateway**: Single entry point for all client requests, handling routing and cross-cutting concerns.

---

## 🏗️ Architecture

The system follows a standard Microservices pattern with an API Gateway and Service Discovery.

```mermaid
graph TD
    %% Styles
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef gateway fill:#fff9c4,stroke:#fbc02d,stroke-width:2px;
    classDef service fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef infra fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    classDef db fill:#eceff1,stroke:#455a64,stroke-width:2px,stroke-dasharray: 5 5;

    User[User Browser] -->|HTTP/JSON| Frontend[React Frontend]
    Frontend -->|REST API| Gateway[API Gateway]

    subgraph Infrastructure [Infrastructure Layer]
        direction TB
        Eureka[Discovery Service]
        Kafka[Apache Kafka]
        Zookeeper[Zookeeper]
    end

    subgraph Microservices [Microservices Layer]
        direction TB
        School[School Service]
        Teacher[Teacher Service]
        Class[Class Service]
        Student[Student Service]
    end

    subgraph Data [Data Layer]
        direction TB
        DB1[(H2 DB)]
        DB2[(H2 DB)]
        DB3[(H2 DB)]
        DB4[(H2 DB)]
    end

    %% Routing
    Gateway -->|Route /school| School
    Gateway -->|Route /teachers| Teacher
    Gateway -->|Route /classes| Class
    Gateway -->|Route /students| Student

    %% Service Discovery
    School -.->|Register| Eureka
    Teacher -.->|Register| Eureka
    Class -.->|Register| Eureka
    Student -.->|Register| Eureka
    Gateway -.->|Discover| Eureka

    %% Async Communication
    Student -->|Publish 'StudentEvent'| Kafka
    Kafka -->|Consume 'StudentEvent'| School

    %% Database Connections
    School --- DB1
    Teacher --- DB2
    Class --- DB3
    Student --- DB4

    %% Apply Styles
    class Frontend frontend;
    class Gateway gateway;
    class School,Teacher,Class,Student service;
    class Eureka,Kafka,Zookeeper infra;
    class DB1,DB2,DB3,DB4 db;
```

---

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Styling**: Custom CSS Variables, Lucide React Icons
-   **Charting**: Recharts
-   **Routing**: React Router DOM

### Backend
-   **Framework**: Spring Boot 3.2.0
-   **Language**: Java 17
-   **Build Tool**: Maven
-   **Database**: H2 Database (In-Memory)

### Microservices Ecosystem
-   **Service Discovery**: Netflix Eureka
-   **API Gateway**: Spring Cloud Gateway
-   **Security**: Spring Security
-   **Messaging**: Apache Kafka
-   **Resilience**: Resilience4j (Circuit Breaker)

---

## 🛡️ Fault Tolerance & Resilience

The system is designed to handle failures gracefully. If a microservice becomes unavailable, the API Gateway intercepts the failure and provides a fallback response, ensuring the user experience remains uninterrupted.

```mermaid
graph TD
    User[User Request] --> Gateway{API Gateway}
    
    Gateway -->|Service Healthy| Service[Microservice]
    Service -->|Response| Gateway
    Gateway -->|Response| User
    
    Gateway -->|Service Down| Fallback[Fallback Controller]
    Fallback -->|Friendly Message| Gateway
    
    style Service fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style Fallback fill:#ffebee,stroke:#c62828,stroke-width:2px
    style Gateway fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
```

---

## 📂 Project Structure

```
school-management/
├── backend/
│   ├── discovery-service/  # Service Registry (Port 8761)
│   ├── api-gateway/        # Entry Point (Port 8080)
│   ├── school-service/     # School Management (Port 8081)
│   ├── teacher-service/    # Teacher Management (Port 8082)
│   ├── class-service/      # Class Management (Port 8083)
│   └── student-service/    # Student Management (Port 8084)
├── frontend/               # React Application (Port 5173)
├── docker-compose.yml      # Kafka Infrastructure
└── README.md               # Documentation
```

---

## ⚙️ Installation & Running

### Prerequisites
-   **Java 17+**
-   **Node.js 16+**
-   **Docker Desktop** (For Kafka)

### 1. Start Infrastructure (Kafka)
```powershell
docker-compose up -d
```

### 2. Start Backend Services
Open separate terminals for each service and run:

**Discovery Service (8761)**
```powershell
cd backend/discovery-service
mvn spring-boot:run
```

**API Gateway (8080)**
```powershell
cd backend/api-gateway
mvn spring-boot:run
```

**Microservices (8081-8084)**
Run `mvn spring-boot:run` in each service directory:
-   `backend/school-service`
-   `backend/teacher-service`
-   `backend/class-service`
-   `backend/student-service`

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Usage

1.  Visit `http://localhost:5173`.
2.  **Login Credentials**:
    -   **Username**: `admin`
    -   **Password**: `password`
3.  Explore the dashboard and management modules.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

*Developed by [Bhaumiksinh](https://github.com/bhaumiksinh)*
