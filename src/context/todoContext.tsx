import { createContext, ReactNode, useEffect, useState } from 'react';

interface TodoProviderProps {
  children: ReactNode;
}
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface TodoContextProps {
  task: Task[];
  setTask: (value: []) => void;
}

const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export default function TodoProvider({ children }: TodoProviderProps) {
  const [task, setTask] = useState<Task[]>([]);
  console.log(task);
  //
  useEffect(() => {

    const initialTasks = [
      { id: 1, title: 'Complete online JS course', isComplete: true },
      { id: 2, title: 'Jog around the park', isComplete: false },
      { id: 3, title: '10 minute meditation', isComplete: false },
      { id: 4, title: 'Read for 1 hour', isComplete: false },
      { id: 4, title: 'Pick up groceries', isComplete: false },
      {
        id: 6,
        title: 'Complete todo App',
        isComplete: false,
      },
    ];

    const tasks = JSON.parse(
      localStorage.getItem('tasks') || JSON.stringify(initialTasks)
    );

    setTask(tasks);
  }, []);

  useEffect(() => {
    console.log('setting')
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    // We have an issue below. Try to fix it and send Pull Request (PR) to my repo by creating separate branch.
    <TodoContext.Provider value={{ task, setTask }}>
      {children}
    </TodoContext.Provider>
  );
}
