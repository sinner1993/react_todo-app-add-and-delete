import { Todo } from '../../types/Todo';
import { addTodos, USER_ID } from '../../api/todos';
import { FakeToDo } from '../../types/fakeTodo';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  disabled: boolean;
  handleAutofocus: () => void;
  setFakeTodo: React.Dispatch<React.SetStateAction<FakeToDo | null>>;
  setLoader: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  todos: Todo[];
};

export const AddTodos: React.FC<Props> = ({
  value,
  setValue,
  setErrorMesage,
  setTodos,
  inputRef,
  disabled,
  handleAutofocus,
  setFakeTodo,
  setLoader,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value.trim()) {
      setErrorMesage('Title should not be empty');
      setTimeout(() => setErrorMesage(''), 3000);

      return;
    }

    handleAutofocus();
    const tempId = Math.floor(Math.random() * 100000000);
    const tempTodo = { id: tempId, title: value.trim() };

    setLoader(prev => ({ ...prev, [tempId]: true }));
    setFakeTodo(tempTodo);

    addTodos({
      id: tempId,
      title: value.trim(),
      userId: USER_ID,
      completed: false,
    })
      .then(response => {
        if (response) {
          setLoader(prev => ({ ...prev, [tempId]: false }));
          setFakeTodo(null);
          setTodos(prev => [...prev, response]);
        }
      })
      .catch(() => setErrorMesage('error'))
      .finally(() => {
        setValue('');
      });
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
