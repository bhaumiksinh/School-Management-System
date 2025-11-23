import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Types
export interface School {
    name: string;
    address: string;
    principal: string;
    contact: string;
}

export interface Teacher {
    id: string;
    name: string;
    subject: string;
    email: string;
}

export interface ClassItem {
    id: string;
    name: string;
    teacherId: string;
    room: string;
}

export interface Student {
    id: string;
    name: string;
    classId: string;
    age: number;
    guardian: string;
}

interface AppContextType {
    school: School;
    updateSchool: (school: School) => void;
    teachers: Teacher[];
    addTeacher: (teacher: Teacher) => void;
    classes: ClassItem[];
    addClass: (classItem: ClassItem) => void;
    students: Student[];
    addStudent: (student: Student) => void;
    isAuthenticated: boolean;
    login: (username?: string, password?: string) => void;
    logout: () => void;
}

const defaultSchool: School = {
    name: "",
    address: "",
    principal: "",
    contact: ""
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [school, setSchool] = useState<School>(defaultSchool);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [token, setToken] = useState<string | null>(null);

    const API_BASE = 'http://localhost:8080/api';

    useEffect(() => {
        if (isAuthenticated && token) {
            fetchSchool();
            fetchTeachers();
            fetchClasses();
            fetchStudents();
        }
    }, [isAuthenticated, token]);

    const getHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        };
    };

    const fetchSchool = async () => {
        try {
            const res = await fetch(`${API_BASE}/school`, { headers: getHeaders() });
            if (res.ok) setSchool(await res.json());
        } catch (err) {
            console.error("Failed to fetch school", err);
        }
    };

    const fetchTeachers = async () => {
        try {
            const res = await fetch(`${API_BASE}/teachers`, { headers: getHeaders() });
            if (res.ok) setTeachers(await res.json());
        } catch (err) {
            console.error("Failed to fetch teachers", err);
        }
    };

    const fetchClasses = async () => {
        try {
            const res = await fetch(`${API_BASE}/classes`, { headers: getHeaders() });
            if (res.ok) setClasses(await res.json());
        } catch (err) {
            console.error("Failed to fetch classes", err);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await fetch(`${API_BASE}/students`, { headers: getHeaders() });
            if (res.ok) setStudents(await res.json());
        } catch (err) {
            console.error("Failed to fetch students", err);
        }
    };

    const updateSchool = async (newSchool: School) => {
        try {
            const res = await fetch(`${API_BASE}/school`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(newSchool)
            });
            if (res.ok) setSchool(await res.json());
        } catch (err) {
            console.error("Failed to update school", err);
        }
    };

    const addTeacher = async (teacher: Teacher) => {
        try {
            const res = await fetch(`${API_BASE}/teachers`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(teacher)
            });
            if (res.ok) {
                const savedTeacher = await res.json();
                setTeachers([...teachers, savedTeacher]);
            }
        } catch (err) {
            console.error("Failed to add teacher", err);
        }
    };

    const addClass = async (classItem: ClassItem) => {
        try {
            const res = await fetch(`${API_BASE}/classes`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(classItem)
            });
            if (res.ok) {
                const savedClass = await res.json();
                setClasses([...classes, savedClass]);
            }
        } catch (err) {
            console.error("Failed to add class", err);
        }
    };

    const addStudent = async (student: Student) => {
        try {
            const res = await fetch(`${API_BASE}/students`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(student)
            });
            if (res.ok) {
                const savedStudent = await res.json();
                setStudents([...students, savedStudent]);
            }
        } catch (err) {
            console.error("Failed to add student", err);
        }
    };

    const login = (username?: string, password?: string) => {
        if (username && password) {
            const credentials = btoa(`${username}:${password}`);
            setToken(credentials);
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
    };

    return (
        <AppContext.Provider value={{
            school, updateSchool,
            teachers, addTeacher,
            classes, addClass,
            students, addStudent,
            isAuthenticated, login, logout
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
