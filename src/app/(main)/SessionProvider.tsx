'use client';

import { Session, User } from 'lucia';
import { createContext, PropsWithChildren, ReactChild, ReactNode } from 'react';

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
