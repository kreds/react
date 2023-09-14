import React, { useEffect } from 'react';
import { KredsComponent } from '@kreds/types';
import clsx from 'clsx';

import styles from './Modal.module.scss';
import { useKreds } from '../../context.js';
import { defaultRenderRow } from './defaultRenderRow.js';
import { defaultT } from './defaultT.js';
import { Portal } from './Portal.js';
import { ModalHeader, ModalHeaderClasses } from './Header.js';
import { ModalBody, ModalBodyClasses } from './Body.js';
import { Overlay } from './Overlay.js';

export interface ModalClasses {
  modal?: string;
  overlay?: string;
}

export interface ModalProps {
  /**
   * Translation function.
   * @param key
   */
  t?(key: string): string;

  /**
   * Class names
   */
  classes?: {
    modal?: ModalClasses;
    header?: ModalHeaderClasses;
    body?: ModalBodyClasses;
  };

  /**
   * Render payload from server.
   * @param component
   */
  renderRow?(component: KredsComponent): React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  t = defaultT,
  classes,
  renderRow = defaultRenderRow,
}) => {
  const kreds = useKreds();

  useEffect(() => {
    if (!kreds.isOpen) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        kreds.close();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [kreds.isOpen]);

  return (
    <Portal isOpen={kreds.isOpen}>
      <Overlay
        className={classes?.modal?.overlay}
        onClick={() => kreds.close()}
      >
        <div className={clsx(styles.modal, classes?.modal?.modal)}>
          <ModalHeader t={t} classes={classes?.header} />
          <ModalBody t={t} renderRow={renderRow} classes={classes?.body} />
        </div>
      </Overlay>
    </Portal>
  );
};

export { defaultRenderRow };
