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
    login: () => void;
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

    const API_BASE = 'http://localhost:8080/api';

    useEffect(() => {
        if (isAuthenticated) {
            fetchSchool();
            fetchTeachers();
            fetchClasses();
            fetchStudents();
        }
    }, [isAuthenticated]);

    const fetchSchool = async () => {
        try {
            const res = await fetch(`${API_BASE}/school`);
            if (res.ok) setSchool(await res.json());
        } catch (err) {
            console.error("Failed to fetch school", err);
        }
    };

    const fetchTeachers = async () => {
        try {
            const res = await fetch(`${API_BASE}/teachers`);
            if (res.ok) setTeachers(await res.json());
        } catch (err) {
            console.error("Failed to fetch teachers", err);
        }
    };

    const fetchClasses = async () => {
        try {
            const res = await fetch(`${API_BASE}/classes`);
            if (res.ok) setClasses(await res.json());
        } catch (err) {
            console.error("Failed to fetch classes", err);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await fetch(`${API_BASE}/students`);
            if (res.ok) setStudents(await res.json());
        } catch (err) {
            console.error("Failed to fetch students", err);
        }
    };

    const updateSchool = async (newSchool: School) => {
        try {
            const res = await fetch(`${API_BASE}/school`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
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

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

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
