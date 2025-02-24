import React from 'react';
import { Todo } from '../../types/Todo';
import { removeTodos } from '../../api/todos';

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>;
  handleAutofocus: () => void;
};

export const RemoveButton: React.FC<Props> = ({
  todo,
  setTodos,
  setErrorMesage,
  handleAutofocus,
}) => {
  const handleRemove = async () => {
    try {
      handleAutofocus();
      setErrorMesage('');
      await removeTodos(todo.id);
      setTodos((prev: Todo[]) => prev.filter(item => item.id !== todo.id));
    } catch {
      setErrorMesage('Unable to delete todo');
    }
  };

  return (
    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
      onClick={handleRemove}
    >
      ×
    </button>
  );
};
