import clsx from 'clsx';
import { ReactNode } from 'react';
import s from './Button.module.scss';

export default function Button({
  children,
  className
}: {
  className?: string;
  children?: ReactNode;
}): JSX.Element {
  return (
    <button className={clsx(s.button, className)} type="button">
      {children}
    </button>
  );
}
