import { Loader } from '../Loader/Loader';

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  title: string;
  id: number | null;
  loader: Record<number, boolean>;
};

export const TodoItem: React.FC<Props> = ({ title, id, loader }) => {
  const checked = id ?? 0;

  return (
    <div data-cy="Todo" className="todo">
      <label className="todo__status-label">
        <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
      </label>
      <div data-cy="TodoTitle" className="todo__title">
        {title}
      </div>
      <Loader loader={loader} todoId={checked} />
    </div>
  );
};
