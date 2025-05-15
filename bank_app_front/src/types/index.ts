export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  owner: User;
}

export interface Transaction {
  id: number;
  sender: {
    id: number;
    accountNumber: string;
  };
  receiver: {
    id: number;
    accountNumber: string;
  };
  amount: number;
  timestamp: string;
}

export interface Notification {
  message: string;
  type: "success" | "error";
}

export interface AppContextType {
  user: User | null;
  accounts: Account[];
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account) => void;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  notification: Notification | null;
  showNotification: (message: string, type?: "success" | "error") => void;
  mockLogin: (email: string) => void;
  performTransfer: (receiverAccount: string, amount: number) => void;
  logout: () => void;
}
