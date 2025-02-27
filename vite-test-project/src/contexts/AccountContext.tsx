import React, { createContext, useState, ReactNode } from 'react';
import { Account } from '../features/SignUp/types/accountTypes';
import { AccountContextType } from '../features/SignUp/types/accountTypes';

export const AccountContext = createContext<AccountContextType>({} as AccountContextType);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
    
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};