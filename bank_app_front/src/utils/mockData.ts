import type { Account, Transaction, User } from "../types";

export const mockLoginAPI = (
  email: string
): { user: User; accounts: Account[] } => {
  const user: User = { id: 1, name: "John Doe", email };
  const accounts: Account[] = [
    {
      id: 1,
      accountNumber: "FR7630001007941234567890185",
      balance: 1500.75,
      owner: user,
    },
    {
      id: 2,
      accountNumber: "FR7630004000031234567890143",
      balance: 850.32,
      owner: user,
    },
  ];
  return { user, accounts };
};

export const mockTransactions = (accountId: number): Transaction[] => {
  const now = new Date();
  return [
    {
      id: 1,
      sender: {
        id: 1,
        accountNumber: "FR7630001007941234567890185",
      },
      receiver: { id: 3, accountNumber: "FR7630006000011234567890189" },
      amount: 150,
      timestamp: new Date(now.getTime() - 86400000).toISOString(),
    },
    {
      id: 2,
      sender: {
        id: 4,
        accountNumber: "FR7630006000011234567890189",
      },
      receiver: { id: 1, accountNumber: "FR7630001007941234567890185" },
      amount: 75.5,
      timestamp: new Date(now.getTime() - 172800000).toISOString(),
    },
  ];
};
