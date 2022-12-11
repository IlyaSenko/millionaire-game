import clsx from 'clsx';
import Hamburger from 'components/Hamburger';
import { useCallback, useMemo, useState } from 'react';
import Media from 'react-media';
import { formatPrize } from 'utils/formarPrize';
import questions from 'questions.json';
import s from './Game.module.scss';

type TQuestionStatus = 'passed' | 'current' | 'upcoming';
interface IStep {
  prize: number;
  status: TQuestionStatus;
}

function getStatusById(iteratedQuestionId: number, currentQuestionId: number): TQuestionStatus {
  if (iteratedQuestionId < currentQuestionId) {
    return 'passed';
  }
  if (iteratedQuestionId == currentQuestionId) {
    return 'current';
  }
  return 'upcoming';
}

function Option({
  value,
  label,
  onClick
}: {
  value: string;
  label: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <div className={s.optionWrapper} onClick={onClick}>
      <div className={s.optionConnector} />
      <div className={s.option}>
        <h4>{value}</h4>
        <span>{label}</span>
      </div>
      <div className={s.optionConnector} />
    </div>
  );
}

function ProgressStep({ prize, status }: IStep): JSX.Element {
  return (
    <div className={s.stepWrapper}>
      <div className={clsx(s.progressStepConnector, s[status])} />
      <div className={clsx(s.step, s[status])}>{formatPrize(prize)}</div>
      <div className={clsx(s.progressStepConnector, s[status])} />
    </div>
  );
}

export default function Game({
  onCorrectAnswer,
  onWrongAnswer,
  currentQuestionId
}: {
  currentQuestionId: number;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}): JSX.Element {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenuOpened = useCallback(() => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }, [isMobileMenuOpened]);

  const currentQuestion = useMemo(() => {
    return questions.find(({ id }) => id === currentQuestionId);
  }, [currentQuestionId]);

  const handleSelectAnswer = useCallback(
    (value: string) => {
      const correctAnswer = currentQuestion?.answers.find(({ isCorrect }) => isCorrect)?.value;
      const isEnteredValueCorrect = correctAnswer === value;

      if (isEnteredValueCorrect) {
        onCorrectAnswer();
      } else {
        onWrongAnswer();
      }
    },
    [currentQuestion]
  );

  return (
    <div className={s.wrapper}>
      <Media query={{ maxWidth: 991 }}>
        <Hamburger
          state={isMobileMenuOpened ? 'close' : 'hamburger'}
          onClick={toggleMobileMenuOpened}
        />
      </Media>
      <div className={s.board}>
        <h3 className={s.question}>{currentQuestion?.question}</h3>
        <div className={s.options}>
          {currentQuestion?.answers.map(({ value, label }) => (
            <Option
              key={value}
              value={value}
              label={label}
              onClick={() => handleSelectAnswer(value)}
            />
          ))}
        </div>
      </div>
      <div
        className={clsx(s.progressBar, {
          [s.isMobileMenuOpened]: isMobileMenuOpened
        })}>
        <div className={s.progressBarInner}>
          {questions
            .map(({ prize, id }) => (
              <ProgressStep key={id} prize={prize} status={getStatusById(id, currentQuestionId)} />
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
}
