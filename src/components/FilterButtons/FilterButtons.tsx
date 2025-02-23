import classNames from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  title: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<Status>>;
  activeFilter: Status;
  activeOptions: Status;
};

export const FilterButtons: React.FC<Props> = ({
  title,
  activeFilter,
  setActiveFilter,
  activeOptions,
}) => {
  return (
    <a
      href="#/"
      data-cy={`FilterLink${title}`}
      className={classNames('filter__link', {
        selected: title === activeFilter,
      })}
      onClick={() => setActiveFilter(activeOptions)}
    >
      {title}
    </a>
  );
};
