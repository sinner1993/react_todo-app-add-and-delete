import { Todo } from '../types/Todo';
import { addTodos, removeTodos, updateTodos } from '../api/todos';

export const handleLoading = (
  id: number,
  state: boolean,
  setLoader: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
) => {
  setLoader(prev => ({ ...prev, [id]: state }));
};

export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>,
  setLoader: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
  setDisableInput: React.Dispatch<React.SetStateAction<boolean>>,
  setTodosCopy: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  event.preventDefault();

  if (!value.trim()) {
    setErrorMesage('Title should not be empty');
    setTimeout(() => {
      setErrorMesage('');
    }, 3000);

    return;
  }

  setErrorMesage('');
  setDisableInput(true);

  const tempTodo: Todo = {
    title: value.trim(),
    id: Math.floor(Math.random() * 100000000),
    completed: false,
  };

  setTodos(prev => [...prev, tempTodo]);
  handleLoading(tempTodo.id, true, setLoader);

  try {
    const response = await addTodos(tempTodo);

    setTimeout(() => {
      setTodos(prev => prev.filter(todo => todo.id !== tempTodo.id));
      setTodos(prev => [...prev, response]);
      setTodosCopy(prev => [...prev, response]);
      handleLoading(tempTodo.id, false, setLoader);
      setValue('');
      setDisableInput(false);
    }, 300);
  } catch (error) {
    setTodos(prev => prev.filter(todo => todo.id !== tempTodo.id));
    setErrorMesage('Unable to add a todo');
    setTimeout(() => {
      setValue('');
      setDisableInput(false);
      setErrorMesage('');
    }, 3000);
  }
};

export const handleComplete = async (
  todo: Todo,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setTodosCopy: React.Dispatch<React.SetStateAction<Todo[]>>,
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>,
  setLoader: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
) => {
  const updatedTodo = { ...todo, completed: !todo.completed };

  try {
    handleLoading(todo.id, true, setLoader);
    const updatedResponse: Todo = await updateTodos(todo.id, updatedTodo);

    setTimeout(() => {
      setTodos(prev =>
        prev.map(item =>
          item.id === updatedResponse.id ? updatedResponse : item,
        ),
      );
      setTodosCopy(prev =>
        prev.map(item =>
          item.id === updatedResponse.id ? updatedResponse : item,
        ),
      );
      handleLoading(todo.id, false, setLoader);
    }, 100);
  } catch {
    setErrorMesage('Unable to update todo');
  }
};

export const handleRemove = async (
  todo: Todo,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>,
  setLoader: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
) => {
  try {
    handleLoading(todo.id, true, setLoader);
    setErrorMesage('');

    setTimeout(async () => {
      await removeTodos(todo.id);
      setTodos(prev => prev.filter(item => item.id !== todo.id));
      handleLoading(todo.id, false, setLoader);
    }, 100);
  } catch {
    setErrorMesage('Unable to delete todo');
  }
};

export const handleUpdateForm = async (
  event: React.FormEvent<HTMLFormElement>,
  todo: Todo,
  updateValue: string,
  setUpdateSwitcher: React.Dispatch<React.SetStateAction<number>>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>,
  setLoader: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
) => {
  event.preventDefault();

  if (!updateValue.trim()) {
    setErrorMesage('Title should not be empty');

    return;
  }

  try {
    const updatedTodo: Todo = await updateTodos(todo.id, {
      ...todo,
      title: updateValue,
    });

    handleLoading(todo.id, true, setLoader);
    setUpdateSwitcher(0);

    setTimeout(() => {
      handleLoading(todo.id, false, setLoader);
      setTodos(prev =>
        prev.map(item => (item.id === updatedTodo.id ? updatedTodo : item)),
      );
    }, 100);
  } catch {
    setErrorMesage('Unable to update todo');
  }
};
