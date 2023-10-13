# @kreds/react

## Usage

### Basic example

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Kreds from '@kreds/react';
import { KredsClient } from '@kreds/client';

import '@kreds/react/index.scss';

const kreds = new KredsClient({
  url: new URL('/kreds/', window.location.href),
  prefix: 'demo_',
});

const App: React.FC = () => {
  const kreds = Kreds.useKreds();

  return <div>{kreds.user?.name}</div>;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Kreds.Provider client={kreds}>
      <Kreds.Modal />
      <App />
    </Kreds.Provider>
  </React.StrictMode>,
);
```
