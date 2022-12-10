import clsx from 'clsx';
import { ReactNode } from 'react';
import s from './Button.module.scss';
import { IButtonProps } from './types';

export default function Button({ children, className, ...htmlProps }: IButtonProps): JSX.Element {
  return (
    <button className={clsx(s.button, className)} type="button" {...htmlProps}>
      {children}
    </button>
  );
}
