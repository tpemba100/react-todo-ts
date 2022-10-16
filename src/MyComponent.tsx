import { useContext } from 'react';
import { TodoContext } from './context/todoContext';
import useHandleTodo from './hooks/useHandleTodo';

function MyComponent() {
    const { task } = useHandleTodo();
    return (
        <div>
            {task.map((item, index) => (
                <div key={item.id}>{item.title}</div>
            ))}
        </div>
    );
}

export default MyComponent;
