import { Todo } from '../../types/Todo';
import { addTodos, USER_ID } from '../../api/todos';
import { FakeToDo } from '../../types/fakeTodo';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  disabled: boolean;
  handleAutofocus: () => void;
  setFakeTodo: React.Dispatch<React.SetStateAction<FakeToDo | null>>;
  handleLoading: (id: number, state: boolean) => void;
};

export const AddTodos: React.FC<Props> = ({
  value,
  setValue,
  setErrorMesage,
  setTodos,
  inputRef,
  disabled,
  handleAutofocus,
  setCounter,
  setFakeTodo,
  handleLoading,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) {
      setErrorMesage('Title should not be empty');
      setTimeout(() => setErrorMesage(''), 3000);

      return;
    }

    handleAutofocus();
    const tempTodo = { id: 0, title: value.trim() };

    setFakeTodo(tempTodo);
    handleLoading(tempTodo.id, true);

    try {
      const response = await addTodos({
        id: Math.floor(Math.random() * 100000000),
        title: value.trim(),
        userId: USER_ID,
        completed: false,
      });

      if (response.id) {
        setFakeTodo(null);
        setTodos(prev => [...prev, response]);
        setCounter(prev => prev + 1);
        setValue('');
      }
    } catch (error) {
      setErrorMesage('Unable to add a todo');
      setFakeTodo(null);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={handleOnChange}
        value={value}
        disabled={disabled}
        ref={inputRef}
      />
    </form>
  );
};
