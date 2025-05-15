import axios from "axios";

const API_URL = "http://localhost:8080/api";

export interface TransferRequest {
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
}

export const api = {
  async performTransfer(request: TransferRequest) {
    const response = await axios.post(`${API_URL}/transfer`, request);
    return response.data;
  },

  async getAccountTransactions(accountNumber: string) {
    const response = await axios.get(
      `${API_URL}/accounts/${accountNumber}/transactions`
    );
    return response.data;
  },

  async getUserAccounts(userId: number) {
    const response = await axios.get(`${API_URL}/users/${userId}/accounts`);
    return response.data;
  },
};
