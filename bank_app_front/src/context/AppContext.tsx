import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Types
export type User = { id: number; name: string; email: string };
export type Account = {
  id: number;
  accountNumber: string;
  balance: number;
  owner: User;
};
export type Transaction = {
  id: number;
  sender: Account;
  receiver: { id: number; accountNumber: string };
  amount: number;
  timestamp: string;
};
export type NotificationType = {
  message: string;
  type: "success" | "error";
} | null;

interface AppContextType {
  user: User | null;
  accounts: Account[];
  selectedAccount: Account | null;
  setSelectedAccount: (acc: Account) => void;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  setError: (err: string | null) => void;
  notification: NotificationType;
  showNotification: (message: string, type?: "success" | "error") => void;
  mockLogin: (email: string) => void;
  performTransfer: (receiverAccount: string, amount: number) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationType>(null);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const mockLogin = (email: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const mockUser: User = { id: 1, name: "John Doe", email };
      setUser(mockUser);
      const mockAccounts: Account[] = [
        {
          id: 1,
          accountNumber: "FR7630001007941234567890185",
          balance: 1500.75,
          owner: mockUser,
        },
        {
          id: 2,
          accountNumber: "FR7630004000031234567890143",
          balance: 850.32,
          owner: mockUser,
        },
      ];
      setAccounts(mockAccounts);
      setSelectedAccount(mockAccounts[0]);
      setIsLoading(false);
      showNotification(`Bienvenue, ${mockUser.name}!`);
    }, 800);
  };

  const fetchTransactions = (accountId: number) => {
    setIsLoading(true);
    setTimeout(() => {
      const currentDate = new Date();
      const mockTransactions: Transaction[] = [
        {
          id: 1,
          sender: accounts[0],
          receiver: { id: 3, accountNumber: "FR7630006000011234567890189" },
          amount: 150.0,
          timestamp: new Date(currentDate.getTime() - 86400000).toISOString(),
        },
        {
          id: 2,
          sender: accounts[1] || accounts[0],
          receiver: { id: 1, accountNumber: "FR7630001007941234567890185" },
          amount: 75.5,
          timestamp: new Date(currentDate.getTime() - 172800000).toISOString(),
        },
      ];
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 800);
  };

  const performTransfer = (receiverAccount: string, amount: number) => {
    setIsLoading(true);
    if (amount <= 0) {
      setError("Le montant doit être supérieur à 0.");
      setIsLoading(false);
      return;
    }
    if (!selectedAccount || selectedAccount.balance < amount) {
      setError("Solde insuffisant pour effectuer ce transfert.");
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      const updatedAccounts = accounts.map((account) =>
        account.id === selectedAccount.id
          ? { ...account, balance: account.balance - amount }
          : account
      );
      setAccounts(updatedAccounts);
      setSelectedAccount(
        updatedAccounts.find((acc) => acc.id === selectedAccount.id) || null
      );
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        sender: selectedAccount,
        receiver: { id: 99, accountNumber: receiverAccount },
        amount,
        timestamp: new Date().toISOString(),
      };
      setTransactions([newTransaction, ...transactions]);
      setIsLoading(false);
      showNotification(`Transfert de ${amount}€ effectué avec succès!`);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    setAccounts([]);
    setSelectedAccount(null);
    setTransactions([]);
  };

  useEffect(() => {
    if (selectedAccount) {
      fetchTransactions(selectedAccount.id);
    }
    // eslint-disable-next-line
  }, [selectedAccount]);

  const contextValue: AppContextType = {
    user,
    accounts,
    selectedAccount,
    setSelectedAccount,
    transactions,
    isLoading,
    error,
    setError,
    notification,
    showNotification,
    mockLogin,
    performTransfer,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
