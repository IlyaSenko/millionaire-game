import Button from 'components/Button';
import s from './End.module.scss';

export default function End({ onSubmit }: { onSubmit: () => void }): JSX.Element {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <img className={s.hand} src="/hand.png" alt="hand" />
        <div className={s.text}>
          <p className={s.headingLabel}>Total score:</p>
          <h1 className={s.heading}>$8,000 earned</h1>
          <Button className={s.button} onClick={onSubmit}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
