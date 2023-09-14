import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Paragraph.module.scss';
import { KredsComponentParagraph } from '@kreds/types';

export interface ParagraphProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'ref'> {
  mode: KredsComponentParagraph['mode'];
}

export const Paragraph: React.FC<ParagraphProps> = ({
  className,
  mode,
  ...props
}) => {
  return (
    <div
      className={clsx(
        styles.paragraph,
        mode ? styles[mode] : undefined,
        className
      )}
      {...props}
    />
  );
};
