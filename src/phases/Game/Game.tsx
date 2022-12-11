import clsx from 'clsx';
import Hamburger from 'components/Hamburger';
import { useCallback, useState } from 'react';
import Media from 'react-media';
import s from './Game.module.scss';

type TQuestionStatus = 'passed' | 'current' | 'upcoming';
interface IStep {
  prize: number;
  status: TQuestionStatus;
}

const OPTIONS_CONFIG = [
  {
    value: 'A',
    label: '10 years'
  },
  {
    value: 'B',
    label: '11 years'
  },
  {
    value: 'C',
    label: '14 years'
  },
  {
    value: 'D',
    label: '15 years'
  }
];

const STEPS_CONFIG: IStep[] = [
  {
    prize: 1000000,
    status: 'upcoming'
  },
  {
    prize: 500000,
    status: 'upcoming'
  },
  {
    prize: 250000,
    status: 'upcoming'
  },
  {
    prize: 125000,
    status: 'upcoming'
  },
  {
    prize: 64000,
    status: 'upcoming'
  },
  {
    prize: 32000,
    status: 'upcoming'
  },
  {
    prize: 16000,
    status: 'upcoming'
  },
  {
    prize: 8000,
    status: 'current'
  },
  {
    prize: 4000,
    status: 'passed'
  },
  {
    prize: 2000,
    status: 'passed'
  },
  {
    prize: 1000,
    status: 'passed'
  },
  {
    prize: 500,
    status: 'passed'
  }
];

function formatPrize(x: number) {
  return `$${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
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

export default function Game({ onFinish }: { onFinish: () => void }): JSX.Element {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenuOpened = useCallback(() => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }, [isMobileMenuOpened]);

  return (
    <div className={s.wrapper}>
      <Media query={{ maxWidth: 991 }}>
        <Hamburger
          state={isMobileMenuOpened ? 'close' : 'hamburger'}
          onClick={toggleMobileMenuOpened}
        />
      </Media>
      <div className={s.board}>
        <h3 className={s.question}>
          How old your elder brother was 10 years before you was born, mate?
        </h3>
        <div className={s.options}>
          {OPTIONS_CONFIG.map(({ value, label }) => (
            <Option key={value} value={value} label={label} onClick={onFinish} />
          ))}
        </div>
      </div>
      <div
        className={clsx(s.progressBar, {
          [s.isMobileMenuOpened]: isMobileMenuOpened
        })}>
        <div className={s.progressBarInner}>
          {STEPS_CONFIG.map(({ prize, status }) => (
            <ProgressStep key={prize} prize={prize} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
}
