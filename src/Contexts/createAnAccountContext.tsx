import React, { createContext, useState, useContext, ReactNode } from "react";

export interface AccountInfo {
  name: string;
  eventCategories: string[];
  logoUrl: string;
  facebookAccUrl: string;
  instagramAccUrl: string;
  twiiterAccUrl: string;
}

interface AccountContextProps {
  accountInfo: AccountInfo;
  setAccountInfo: React.Dispatch<React.SetStateAction<AccountInfo>>;
}

const defaultAccountInfo: AccountInfo = {
  name: "",
  eventCategories: [],
  logoUrl: "",
  facebookAccUrl: "",
  instagramAccUrl: "",
  twiiterAccUrl: "",
};

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider"); // Corrected error message
  }
  return context;
};

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accountInfo, setAccountInfo] =
    useState<AccountInfo>(defaultAccountInfo);
  return (
    <AccountContext.Provider value={{ accountInfo, setAccountInfo }}>
      {children}
    </AccountContext.Provider>
  );
};
