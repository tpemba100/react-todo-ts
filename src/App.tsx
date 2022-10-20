import { ToastContainer } from 'react-toastify';
import TodoComponent from './components/TodoComponent';
import TodoProvider from './context/todoContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TodoProvider>
      <TodoComponent />
      <ToastContainer autoClose={600} />
    </TodoProvider>
  );
}

export default App;

//npm run dev

//frontendmentor


//Charkra UI
//  npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
//  npm i react-icons

//tailwind, Ant Design, Chakra UI for UI
