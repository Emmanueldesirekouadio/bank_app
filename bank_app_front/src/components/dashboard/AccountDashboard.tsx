import { useAppContext } from "../../context/AppContextProvider";

export const AccountDashboard = () => {
  const {
    accounts,
    selectedAccount,
    setSelectedAccount,
    transactions,
    isLoading,
  } = useAppContext();

  return (
    <div>
      {/* Sélecteur de compte */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Mes comptes</h2>
        <div className="flex flex-wrap gap-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={`
                flex-1 min-w-64 p-4 rounded-lg border-2 cursor-pointer transition duration-200
                ${
                  selectedAccount?.id === account.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }
              `}
              onClick={() => setSelectedAccount(account)}
            >
              <div className="text-sm text-gray-500 mb-1">Compte N°</div>
              <div className="font-mono text-sm mb-2">
                {account.accountNumber}
              </div>
              <div className="text-2xl font-bold">
                {account.balance.toFixed(2)} FCFA
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historique des transactions */}
      <div>
        <h2 className="text-lg font-medium mb-4">
          Historique des transactions
        </h2>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    De
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {transaction.sender.accountNumber.substring(0, 6)}...
                      {transaction.sender.accountNumber.substring(
                        transaction.sender.accountNumber.length - 4
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {transaction.receiver.accountNumber.substring(0, 6)}...
                      {transaction.receiver.accountNumber.substring(
                        transaction.receiver.accountNumber.length - 4
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        transaction.sender.id === selectedAccount?.id
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.sender.id === selectedAccount?.id
                        ? "-"
                        : "+"}
                      {transaction.amount.toFixed(2)} FCFA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded text-gray-500">
            Aucune transaction à afficher
          </div>
        )}
      </div>
    </div>
  );
};
