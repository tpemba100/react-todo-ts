import { useColorMode } from '@chakra-ui/react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { VscTasklist } from 'react-icons/vsc';
import { toast } from 'react-toastify';

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
  filter: string;
  handleCompletedTask: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  filterTask: (f: string, filteredProductList: Task[], filter: string) => void;
  clearAll: () => void;

  filteredProductList: Task[];
  setFilteredProductTask: (value: []) => void;

  // handleCreateNewTask: (event: KeyboardEvent) => void;
  handleCreateNewTask: any;
  newTaskTitle: string;
  setNewTaskTitle: (value: string) => void;
}

export const TodoContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);

export default function TodoProvider({ children }: TodoProviderProps) {
  const [task, setTask] = useState<Task[]>([]);
  const [filteredProductList, setFilteredProductList] = useState<Task[]>([]);
  const [filter, setFilter] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { colorMode } = useColorMode();

  useEffect(() => {
    const initialTasks = [
      { id: 1, title: 'Complete online JavaScript course', isComplete: true },
      { id: 2, title: 'Jog around the park 3x', isComplete: true },
      { id: 3, title: '10 minutes meditation', isComplete: false },
      { id: 4, title: 'Read for 1 hour', isComplete: false },
      { id: 5, title: 'Pick up groceries', isComplete: false },
      {
        id: 6,
        title: 'Complete Todo App on Frontend Mentor',
        isComplete: false,
      },
    ];

    const tasks = JSON.parse(
      localStorage.getItem('tasks') || JSON.stringify(initialTasks)
    );

    setTask(tasks);
    setFilteredProductList(tasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  function handleCompletedTask(id: number) {
    task.filter((tasks) => {
      if (tasks.id == id) {
        tasks.isComplete
          ? (tasks.isComplete = false)
          : (tasks.isComplete = true);

        console.log(tasks.isComplete);
        setTask([...task]);
      }
    });
  } // filtered thru the all task[53], we selected our task with id that was passed
  // if that task.isComplete is true -> make it false, else make it true.
  // we setTask and pass the updated task array to updated the task.

  // let filteredProductList = task.filter((f) => {
  //   if (filter === 'Active') {
  //     const activeTask = task.filter((tasks) => tasks.isComplete == false);
  //     return activeTask;
  //     console.log(activeTask);
  //     // setTask(activeTask);
  //   } else if (filter === 'Completed') {
  //     const completedTask = task.filter((tasks) => tasks.isComplete == true);
  //     return completedTask;
  //     // setTask(completedTask);
  //   } else return task;
  // });

  // function filterTask(f: string) {
  //   setFilter(f);

  //   const filter = f;
  //   if (f === 'Active') {
  //     const activeTask = task.filter((tasks) => tasks.isComplete == false);
  //     setTask(activeTask);
  //   } else if (f === 'Completed') {
  //     const completedTask = task.filter((tasks) => tasks.isComplete == true);
  //     setTask(completedTask);
  //   } else true;
  //   console.log('filter is ' + filter);
  //   }

  function filterTask(f: string, filteredProductList: Task[], filter: string) {
    if (f === 'Active') {
      setFilter('Active');
      const activeTask = task.filter((tasks) => tasks.isComplete == false);
      filteredProductList = activeTask;
      setFilteredProductList(filteredProductList);

      // console.log('Active  ' + filteredProductList);
      // console.log('Active dsds  ' + activeTask);
    } else if (f === 'Completed') {
      setFilter('Completed');

      const completedTask = task.filter((tasks) => tasks.isComplete == true);
      filteredProductList = completedTask;
      setFilteredProductList(filteredProductList);
    } else if (f === 'All' && filteredProductList !== null) {
      setFilter('All');
      filteredProductList = task;
      setFilteredProductList(filteredProductList);

      // setTask(filteredProductList);
      // console.log('All ->' + filteredProductList);
    }
    console.log('filter is ' + filter);
  }

  function handleDeleteTask(id: number) {
    const filteredTask = task.filter((tasks) => tasks.id !== id);

    setFilteredProductList(filteredTask);
    setTask(filteredTask);
    toast.success('Item Deleted!', {
      theme: colorMode,
    });
  } //

  function clearAll() {
    const filteredTask = task.filter((tasks) => {
      return false;
    });

    setTask(filteredTask);
    setFilteredProductList(filteredTask);
  }

  function handleCreateNewTask(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (!newTaskTitle.trim()) {
        toast.error('Your Todo must have a title', {
          theme: colorMode,
        });
        return setNewTaskTitle('');
      }

      const newTask = {
        id: Math.floor(Math.random() * 10000),
        title: newTaskTitle,
        isComplete: false,
      };

      if (task.length === 0) {
        setTask([newTask]);
        setFilteredProductList([newTask]);
        toast.success('Todo added!', {
          theme: colorMode,
        });
        return setNewTaskTitle('');
      }

      if (task.length >= 20) {
        toast.error('There is a limit of 20 Todos', {
          theme: colorMode,
        });
        return null;
      }

      setTask((oldState) => [...oldState, newTask]);
      setFilteredProductList((oldState) => [...oldState, newTask]);

      toast.success('Todo added!', {
        theme: colorMode,
      });
      setFilter('All');
      setNewTaskTitle('');
    }

    return null;
  }

  return (
    <TodoContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        task,
        setTask,
        filter,
        filterTask,
        clearAll,
        handleCompletedTask,
        handleDeleteTask,
        handleCreateNewTask,
        newTaskTitle,
        setNewTaskTitle,
        filteredProductList,
        setFilteredProductList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
