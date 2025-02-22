import { Todo } from '../../types/Todo';
import { addTodos } from '../../api/todos';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  disabled: boolean;
  handleAutofocus: () => void;
  handleLoading: (id: number, state: boolean) => void;
};

export const AddTodos: React.FC<Props> = ({
  value,
  setValue,
  setErrorMesage,
  setTodos,
  handleLoading,
  inputRef,
  disabled,
  handleAutofocus,
  setCounter,
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

    const tempTodo: Todo = {
      title: value.trim(),
      id: Math.floor(Math.random() * 100000000),
      completed: false,
      userId: 2283,
    };

    handleAutofocus();
    setTodos(prev => [...prev, tempTodo]);
    handleLoading(tempTodo.id, true);

    try {
      const response = await addTodos({
        ...tempTodo,
        id: Math.floor(Math.random() * 100000000),
      });

      if (response.id) {
        setTodos(prev => [...prev, response]);
        setTodos(prev => prev.filter(todo => todo.id !== tempTodo.id));
        setValue('');
        setTodos(prev => {
          setCounter(prev.length);

          return prev;
        });
      }
    } catch (error) {
      setTodos(prev => prev.filter(todo => todo.id !== tempTodo.id));
      setErrorMesage('Unable to add a todo');
      setTimeout(() => {
        setValue('');
        setErrorMesage('');
      }, 3000);
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
