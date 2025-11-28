import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserRole = 'user' | 'courier' | null;

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface Task {
  id: string;
  status: 'searching' | 'accepted' | 'pickup' | 'in_transit' | 'completed' | 'cancelled';
  createdAt: string;
  [key: string]: any;
}

interface AppContextType {
  user: User | null;
  userRole: UserRole;
  isAuthenticated: boolean;
  currentTask: Task | null;
  tasks: Task[];
  courierOnline: boolean;
  login: (userData: User, role: 'user' | 'courier') => void;
  logout: () => void;
  createTask: (taskData: Partial<Task>) => Task;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  setCurrentTask: (task: Task | null) => void;
  toggleCourierOnline: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courierOnline, setCourierOnline] = useState(false);

  const login = (userData: User, role: 'user' | 'courier'): void => {
    setUser(userData);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setCurrentTask(null);
    setCourierOnline(false);
  };

  const createTask = (taskData: Partial<Task>): Task => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      status: 'searching',
      createdAt: new Date().toISOString(),
    } as Task;
    setTasks([newTask, ...tasks]);
    setCurrentTask(newTask);
    return newTask;
  };

  const updateTaskStatus = (taskId: string, status: Task['status']): void => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    ));
    if (currentTask?.id === taskId) {
      setCurrentTask({ ...currentTask, status });
    }
  };

  const toggleCourierOnline = (): void => {
    setCourierOnline(!courierOnline);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        userRole,
        isAuthenticated,
        currentTask,
        tasks,
        courierOnline,
        login,
        logout,
        createTask,
        updateTaskStatus,
        setCurrentTask,
        toggleCourierOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
