import Button from 'components/Button';
import { formatPrize } from 'utils/formarPrize';
import s from './End.module.scss';
import questions from 'questions.json';

export default function End({
  questionId,
  onSubmit
}: {
  questionId: number;
  onSubmit: () => void;
}): JSX.Element {
  const prize = questions.find(({ id }: { id: number }) => id === questionId - 1)?.prize || 0;

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <img className={s.hand} src="/hand.png" alt="hand" />
        <div className={s.text}>
          <p className={s.headingLabel}>Total score:</p>
          <h1 className={s.heading}>{formatPrize(prize)} earned</h1>
          <Button className={s.button} onClick={onSubmit}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
