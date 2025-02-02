import React from 'react';
import { useEffect, useRef } from 'react';

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disableInput: boolean;
};

export const AddTodos: React.FC<Props> = ({
  handleSubmit,
  handleOnChange,
  value,
  disableInput,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === '' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={handleOnChange}
        value={value}
        disabled={disableInput}
      />
    </form>
  );
};
