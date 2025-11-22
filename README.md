# School Management System

A modern, full-stack web application designed to streamline school administration. This system allows for efficient management of schools, teachers, classes, and students through a premium, user-friendly interface.

## 🚀 Introduction

The **School Management System** is built with a robust **Spring Boot** backend and a dynamic **React** frontend. It features a clean, responsive design with secure authentication, real-time data visualization, and comprehensive CRUD capabilities for all administrative tasks.

## ✨ Features

-   **🔐 Authentication**: Secure login system with a dedicated, branded login page.
-   **📊 Dashboard**: Real-time overview with statistics and a "Students per Class" bar chart.
-   **🏫 School Management**: Update and maintain essential school details.
-   **👨‍🏫 Teacher Management**: Register and view teacher profiles.
-   **📚 Class Management**: Organize classes and assign teachers.
-   **🎓 Student Management**: Register students and track their class enrollments.
-   **🎨 Premium UI/UX**: Glassmorphism design, smooth animations, and responsive layout.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Styling**: Custom CSS Variables (Tailwind-like utility classes), Lucide React Icons
-   **Charting**: Recharts
-   **Routing**: React Router DOM

### Backend
-   **Framework**: Spring Boot 3.2.0
-   **Language**: Java 17
-   **Database**: H2 Database (In-Memory)
-   **ORM**: Spring Data JPA
-   **Build Tool**: Maven

## 📂 Project Structure

```
school-management/
├── backend/            # Spring Boot Application
│   ├── src/            # Java source code
│   ├── pom.xml         # Maven configuration
│   └── ...
├── frontend/           # React Application
│   ├── src/            # React source code
│   ├── public/         # Static assets
│   ├── package.json    # Node dependencies
│   └── ...
└── README.md           # Project Documentation
```

## ⚙️ Installation & Running

### Prerequisites
-   **Node.js** (v16 or higher)
-   **Java Development Kit (JDK)** (v17 or higher)
-   **Maven** (Optional, wrapper included in standard projects but manual install used here)

### 1. Backend Setup (Spring Boot)

The backend runs on port `8080`.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Run the application:
    *   **Windows (PowerShell)**:
        ```powershell
        $env:JAVA_HOME="C:\Program Files\Java\jdk-21"; mvn spring-boot:run
        ```
        *(Note: Adjust the JDK path if your installation is different)*

### 2. Frontend Setup (React)

The frontend runs on port `5173`.

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🌐 Usage

1.  Ensure both Backend and Frontend are running.
2.  Open your browser and visit `http://localhost:5173`.
3.  Log in with any non-empty username and password (mock authentication enabled for demo).
4.  Navigate through the sidebar to manage different aspects of the school.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---
*Developed by [Bhaumiksinh](https://github.com/bhaumiksinh)*
