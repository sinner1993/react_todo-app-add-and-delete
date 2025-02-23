import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { ClearButton } from '../ClearButton/ClearButton';
import { FilterButtons } from '../FilterButtons/FilterButtons';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  setActiveFilter: React.Dispatch<React.SetStateAction<Status>>;
  activeFilter: Status;
};

export const Footer: React.FC<Props> = ({
  setTodos,
  todos,
  setActiveFilter,
  activeFilter,
}) => {
  const statusOptions = Object.values(Status);
  const activeTodos: number = todos.filter(
    (todo: Todo) => !todo.completed,
  ).length;
  const completedTodos: number = todos.filter(
    (todo: Todo) => todo.completed,
  ).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {statusOptions.map((title, indx) => {
          return (
            <FilterButtons
              activeFilter={activeFilter}
              key={indx}
              title={title}
              activeOptions={statusOptions[indx]}
              setActiveFilter={setActiveFilter}
            />
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {completedTodos > 0 && (
        <ClearButton
          completedTodos={completedTodos}
          todos={todos}
          setTodos={setTodos}
        />
      )}
    </footer>
  );
};
