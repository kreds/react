import React from 'react';
import {
  KredsAuthenticationStrategy,
  KredsComponent,
} from '@kreds/types';

export interface KredsContextType {
  readonly isLoading: boolean;
  readonly isOpen: boolean;
  readonly render?: KredsComponent[];
  readonly strategies: KredsAuthenticationStrategy[];
  readonly user?: any;
  readonly error?: string;

  open(): void;
  close(): void;
  reset(): void;
  authenticate(name: string, payload?: unknown): void;
  unauthenticate(): void;
}

export const KredsContext = React.createContext<KredsContextType>(undefined!);

export const useKreds = () => React.useContext(KredsContext);
