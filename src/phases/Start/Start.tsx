import Button from 'components/Button';
import s from './Start.module.scss';

export default function Start({ onSubmit }: { onSubmit: () => void }): JSX.Element {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <img className={s.hand} src="hand.png" alt="hand" />
        <div className={s.text}>
          <h1 className={s.heading}>Who wants to be a millionaire?</h1>
          <Button className={s.button} onClick={onSubmit}>
            Start
          </Button>
        </div>
      </div>
      <img className={s.bg} src="start-bg.png" alt="BG" />
    </div>
  );
}
