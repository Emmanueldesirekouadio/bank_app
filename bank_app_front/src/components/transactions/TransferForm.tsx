import { useState } from "react";
import { useAppContext } from "../../context/AppContextProvider";

export const TransferForm = () => {
  const {
    selectedAccount,
    accounts,
    performTransfer,
    isLoading,
    error,
    setError,
  } = useAppContext();
  const [receiverAccount, setReceiverAccount] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
    setError(null);

    // Validation de base
    if (!receiverAccount.trim()) {
      setError("Le numéro de compte du destinataire est requis.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Veuillez entrer un montant valide supérieur à 0.");
      return;
    }

    if (!selectedAccount || parseFloat(amount) > selectedAccount.balance) {
      setError("Solde insuffisant pour effectuer ce transfert.");
      return;
    }

    // Effectuer le transfert
    performTransfer(receiverAccount, parseFloat(amount));

    // Réinitialiser le formulaire
    setReceiverAccount("");
    setAmount("");
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Nouveau transfert</h2>

      {/* Compte source */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-600 mb-2">
          Compte source
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-mono text-sm">
              {selectedAccount?.accountNumber}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {
                accounts.find((acc) => acc.id === selectedAccount?.id)?.owner
                  .name
              }
            </div>
          </div>
          <div className="text-xl font-bold">
            {selectedAccount?.balance.toFixed(2)} FCFA
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="receiverAccount">
            Numéro de compte du destinataire
          </label>
          <input
            id="receiverAccount"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={receiverAccount}
            onChange={(e) => setReceiverAccount(e.target.value)}
            placeholder="FR76..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Montant (FCFA)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          onClick={handleTransfer}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Traitement en cours..." : "Effectuer le transfert"}
        </button>
      </div>
    </div>
  );
};
