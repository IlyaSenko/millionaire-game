import { ReactNode } from 'react';
import s from './Button.module.scss';

export default function Button({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <button className={s.button} type="button">
      {children}
    </button>
  );
}
