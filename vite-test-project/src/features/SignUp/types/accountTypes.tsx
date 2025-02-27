export type Account = {
    userId: string;
    userName: string;
    password: string;
  };
  
export interface AccountContextType {
    account: Account | null;
    setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}