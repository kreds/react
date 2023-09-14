import React from 'react';
import { KredsComponent } from '@kreds/types';
import { Button } from '../base/Button.js';
import { Paragraph } from '../base/Paragraph.js';

export const defaultRenderRow = (component: KredsComponent) => {
  switch (component.type) {
    case 'paragraph':
      return (
        <Paragraph mode={component.mode}>
          {component.children.map(child => (
            <React.Fragment key={child.id}>
              {defaultRenderRow(child)}
            </React.Fragment>
          ))}
        </Paragraph>
      );
    case 'text':
      return <span className="kreds_text">{component.label}</span>;
    case 'link':
      return (
        <a href={component.href} className="kreds_link">
          {component.label}
        </a>
      );
    case 'submit':
      return <Button type="submit">{component.label}</Button>;
    case 'input':
      return (
        <label>
          {component.label}{' '}
          <input type={component.inputType || 'text'} name={component.name} />
        </label>
      );
    default:
      console.warn(
        `[@kreds/react] Attempted to render an unsupported row component: ${
          (component as any).type
        }`
      );
      return <></>;
  }
};
