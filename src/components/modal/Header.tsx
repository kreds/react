import React from 'react';

import styles from './Header.module.scss';
import { useKreds } from '../../context.js';
import { defaultT } from './defaultT.js';
import clsx from 'clsx';

export interface ModalHeaderClasses {
  header?: string;
  title?: string;
  close?: string;
  headline?: string;
}

export interface ModalHeaderProps {
  /**
   * Translation function.
   * @param key
   */
  t?(key: string): string;

  /**
   * Modal header class name
   */
  classes?: ModalHeaderClasses;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  t = defaultT,
  classes,
}) => {
  const kreds = useKreds();

  return (
    <div className={clsx(styles.header, classes?.header)}>
      <div className={clsx(styles.title, classes?.title)}>
        <h2>{t('title')}</h2>
        <button
          className={clsx(styles.close, classes?.close)}
          onClick={kreds.close}
          title={t('close')}
        >
          <svg viewBox="0 0 512 512">
            <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256" />
          </svg>
        </button>
      </div>
      {!kreds.isLoading && (
        <h3 className={classes?.headline}>
          {kreds.render ? t('continue') : t('selectMethod')}
        </h3>
      )}
    </div>
  );
};
