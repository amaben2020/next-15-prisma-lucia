'use client';

import { Session, User } from 'lucia';
import { createContext } from 'react';

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);
