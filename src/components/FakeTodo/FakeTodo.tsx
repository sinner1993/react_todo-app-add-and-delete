/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  title: string;
  loader: Record<number, boolean>;
};

export const FakeTodo: React.FC<Props> = ({ title, loader }) => {
  return (
    <div data-cy="Todo" className="todo">
      <label className="todo__status-label">
        <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
      </label>
      <div data-cy="TodoTitle" className="todo__title">
        {title}
      </div>
      <div
        data-cy="TodoLoader"
        className={`modal overlay ${loader ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
