import React from 'react';
import { KredsClient } from '@kreds/client';
import { KredsAuthenticationStrategy, KredsComponent } from '@kreds/types';

import { KredsContext, KredsContextType } from '../context.js';

interface ProviderProps extends React.PropsWithChildren {
  client: KredsClient<any>;
}

export const Provider: React.FC<ProviderProps> = ({ client, children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [strategies, setStrategies] = React.useState<
    KredsAuthenticationStrategy[]
  >([]);
  const [render, setRender] = React.useState<KredsComponent[]>();
  const [user, setUser] = React.useState<any>();
  const [error, setError] = React.useState<string>();

  const context: KredsContextType = {
    isLoading,
    isOpen,
    strategies,
    render,
    user,
    error,
    open() {
      setIsOpen(true);
      this.reset();

      if (!client.strategies.length && !client.isLoading) {
        client.updateStrategies();
      }
    },
    close() {
      setIsOpen(false);
    },
    reset() {
      setRender(undefined);
    },
    authenticate(name, payload) {
      client.authenticate(name, payload);
    },
    unauthenticate() {
      client.unauthenticate();
    },
  };

  React.useEffect(() => {
    if (!isOpen || render) {
      return;
    }

    if (strategies.length === 1) {
      const action = strategies[0].action;
      if (action?.type === 'redirect') {
        window.location.href = action.url;
      }
    }
  }, [isOpen, strategies, render]);

  React.useEffect(() => {
    setStrategies(client.strategies);
    setUser(client.user);

    const onAuthenticationStateChange = () => {
      setUser(client.user);
    };

    const onLoadingStateChange = () => {
      setStrategies(client.strategies);
      setIsLoading(client.isLoading);
    };

    const onRender = (render: KredsComponent[]) => {
      setRender(render);
      setIsOpen(true);
    };

    const onError = (error: Error) => {
      setError(error.message);
    };

    client.on('authenticationStateChange', onAuthenticationStateChange);
    client.on('loadingStateChange', onLoadingStateChange);
    client.on('render', onRender);
    client.on('error', onError);

    return () => {
      client.off('authenticationStateChange', onAuthenticationStateChange);
      client.off('loadingStateChange', onLoadingStateChange);
      client.off('render', onRender);
      client.off('error', onError);
    };
  }, [setIsOpen, setRender, client]);

  return (
    <KredsContext.Provider value={context}>{children}</KredsContext.Provider>
  );
};
