/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './components/Error/Error';
import { Footer } from './components/Footer/Footer';
import { Todos } from './components/Todos/Todos';
import { AddTodos } from './components/AddToDo/AddToDo';
import { DoUnDoAll } from './components/DoUnDoAll/DoUnDoAll';
import { FakeToDo } from './types/fakeTodo';
import { TodoItem } from './components/TodoItem/TodoItem';

export const App: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMesage, setErrorMesage] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [fakeTodo, setFakeTodo] = useState<FakeToDo | null>(null);
  const [loader, setLoader] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getTodos()
      .then(response => {
        setTimeout(() => {
          setTodos(response);
          setCounter(response.length);
          localStorage.setItem('todosStorage', JSON.stringify(response));
        }, 300);
      })
      .catch(() => {
        setErrorMesage('Unable to load todos');
        setTimeout(() => {
          setErrorMesage('');
        }, 300);
      });
  }, []);

  const handleAutofocus = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 500);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 550);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <DoUnDoAll todos={todos} setTodos={setTodos} />
          {/* Add a todo on form submit */}
          <AddTodos
            inputRef={inputRef}
            value={value}
            setValue={setValue}
            setErrorMesage={setErrorMesage}
            setTodos={setTodos}
            setCounter={setCounter}
            disabled={disabled}
            handleAutofocus={handleAutofocus}
            setFakeTodo={setFakeTodo}
            setLoader={setLoader}
            todos={todos}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => {
            return (
              <Todos
                key={todo.id}
                todo={todo}
                setTodos={setTodos}
                setErrorMesage={setErrorMesage}
                setCounter={setCounter}
                handleAutofocus={handleAutofocus}
                loader={loader}
              />
            );
          })}
          {fakeTodo !== null && (
            <TodoItem title={fakeTodo.title} id={fakeTodo.id} loader={loader} />
          )}
        </section>

        {/* Hide the footer if there are no todos */}
        {counter > 0 && (
          <Footer setTodos={setTodos} todos={todos} setCounter={setCounter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <Error setErrorMesage={setErrorMesage} errorMesage={errorMesage} />
    </div>
  );
};
