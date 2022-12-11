import clsx from 'clsx';
import s from './Hamburger.module.scss';

const Hamburger = ({ state, onClick }: { state: 'hamburger' | 'close'; onClick: () => void }) => {
  return (
    <div className={clsx(s.hamburgerWrapper, { [s.close]: state === 'close' })} onClick={onClick}>
      <span />
      <span />
      <span />
      <span />
    </div>
  );
};

export default Hamburger;
