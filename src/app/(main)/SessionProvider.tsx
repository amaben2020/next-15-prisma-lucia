'use client';

import { Session, User } from 'lucia';
import Error from 'next/error';
import {
  createContext,
  PropsWithChildren,
  ReactChild,
  ReactNode,
  useContext,
} from 'react';

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider = ({
  value,
  children,
}: {
  children: ReactNode;
  value: SessionContext;
}) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    //@ts-ignore
    throw new Error('useSession must be used within a session provider');
  }

  return context;
}
