import React from 'react';

import { KredsClientAction, KredsComponent } from '@kreds/types';

export type RenderRowFn = (component: KredsComponent) => React.ReactNode;
export type RenderActionFn = (
  action: KredsClientAction | undefined,
  context: {
    renderRow: RenderRowFn;
    label?: React.ReactNode;
    defaultOnClick?: () => void;
  }
) => React.ReactNode;
