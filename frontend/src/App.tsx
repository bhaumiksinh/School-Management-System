import { type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { SchoolDetails } from './pages/SchoolDetails';
import { TeacherDetails } from './pages/TeacherDetails';
import { ClassDetails } from './pages/ClassDetails';
import { StudentDetails } from './pages/StudentDetails';
import { Login } from './pages/Login';
import './App.css';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="school" element={<SchoolDetails />} />
            <Route path="teachers" element={<TeacherDetails />} />
            <Route path="classes" element={<ClassDetails />} />
            <Route path="students" element={<StudentDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
