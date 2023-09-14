import React, { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {}

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return <button className={styles.button} {...props} />;
};
