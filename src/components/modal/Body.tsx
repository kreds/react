import React from 'react';
import { KredsComponent } from '@kreds/types';
import clsx from 'clsx';

import styles from './Body.module.scss';
import { useKreds } from '../../context.js';
import { Button } from '../base/Button.js';
import { Loading } from './Loading.js';
import { defaultT } from './defaultT.js';
import { RenderActionFn, RenderRowFn } from './types.js';
import { defaultRenderRow } from './defaultRenderRow.js';
import { defaultRenderAction } from './defaultRenderAction.js';

export interface ModalBodyClasses {
  body?: string;
}

export interface ModalBodyProps {
  /**
   * Translation function.
   * @param key
   */
  t?(key: string): string;

  /**
   * Class names
   */
  classes?: ModalBodyClasses;

  /**
   * Render payload from server.
   * @param component
   */
  renderRow?: RenderRowFn;

  /**
   * Render payload from strategy.
   * @param component
   */
  renderAction?: RenderActionFn;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  t = defaultT,
  classes,
  renderRow = defaultRenderRow,
  renderAction = defaultRenderAction,
}) => {
  const kreds = useKreds();

  const renderBody = () => {
    if (kreds.isLoading) {
      return <Loading />;
    }

    if (kreds.render) {
      return (
        <>
          {kreds.render.map(component => (
            <React.Fragment key={component.id}>
              {renderRow(component)}
            </React.Fragment>
          ))}
          <Button onClick={() => kreds.reset()}>{t('back')}</Button>
        </>
      );
    }

    return kreds.strategies.map(strategy => (
      <React.Fragment key={strategy.name}>
        {renderAction(strategy.action, {
          renderRow,
          label: strategy.label,
          defaultOnClick: () => kreds.authenticate(strategy.name),
        })}
      </React.Fragment>
    ));
  };

  return (
    <div className={clsx(styles.body, classes?.body)}>
      {kreds.error &&
        renderRow({
          id: 'error',
          type: 'paragraph',
          mode: 'error',
          children: [{ id: 'errorMessage', type: 'text', label: kreds.error }],
        })}
      {renderBody()}
    </div>
  );
};
