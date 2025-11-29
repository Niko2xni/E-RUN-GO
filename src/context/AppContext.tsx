import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  isAuthenticated: boolean;
  currentTask: Task | null;
  tasks: Task[];
  login: (userData: User) => void;
  logout: () => void;
  createTask: (taskData: Partial<Task>) => Task;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  setCurrentTask: (task: Task | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const login = (userData: User): void => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentTask(null);
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

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        currentTask,
        tasks,
        login,
        logout,
        createTask,
        updateTaskStatus,
        setCurrentTask,
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
