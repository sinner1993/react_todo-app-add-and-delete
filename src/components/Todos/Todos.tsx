/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { UpdateToDo } from '../UpdateTodo/updateTodo';
import { RemoveButton } from '../RemoveTodos/RemoveTodo';
import classNames from 'classnames';
import { Complete } from '../Complete/Complete';
import { CallUpdatingForm } from '../callUpdatingForm/callUpdatingForm';
import { Loader } from '../Loader/Loader';

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>;
  handleAutofocus: () => void;
  loader: Record<number, boolean>;
};

export const Todos: React.FC<Props> = ({
  todo,
  setTodos,
  setErrorMesage,
  handleAutofocus,
  loader,
}) => {
  const id: number = todo.id;
  const [callUpdatingForm, setCallUpdatingForm] = useState<number>(0);
  const [oldValue, setOldValueToUpdatingForm] = useState<string>('');

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <Complete
        todo={todo}
        setTodos={setTodos}
        setErrorMesage={setErrorMesage}
      />

      {callUpdatingForm !== id && (
        <CallUpdatingForm
          setCallUpdatingForm={setCallUpdatingForm}
          todo={todo}
          setOldValueToUpdatingForm={setOldValueToUpdatingForm}
        />
      )}
      {callUpdatingForm !== id && (
        <RemoveButton
          todo={todo}
          setTodos={setTodos}
          setErrorMesage={setErrorMesage}
          handleAutofocus={handleAutofocus}
        />
      )}
      {callUpdatingForm === id && (
        <UpdateToDo
          oldValue={oldValue}
          setCallUpdatingForm={setCallUpdatingForm}
          todo={todo}
          setTodos={setTodos}
          setErrorMesage={setErrorMesage}
        />
      )}
      {/* Overlay will cover the todo while it is being deleted or updated */}
      <Loader id={id} loader={loader} />
    </div>
  );
};
