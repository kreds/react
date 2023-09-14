import React from 'react';

import { Button } from '../base/Button.js';
import { RenderActionFn } from './types.js';

export const defaultRenderAction: RenderActionFn = (
  action,
  { renderRow, label, defaultOnClick }
) => {
  switch (action?.type) {
    case 'render':
      return action.payload.map(component => (
        <React.Fragment key={component.id}>
          {renderRow(component)}
        </React.Fragment>
      ));
    case 'redirect':
      return (
        <Button
          onClick={() => {
            window.location.href = action.url;
          }}
        >
          {label}
        </Button>
      );
    default:
      return <Button onClick={defaultOnClick}>{label}</Button>;
  }
};
