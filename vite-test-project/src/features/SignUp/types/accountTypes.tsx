export type Account = {
  userId: string;
  userName: string;
  password: string;
};

export type AccountContextType = {
  account: Account | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  setAccount: (account: Account) => void;
};
