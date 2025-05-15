import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

export const LoginScreen = () => {
  const { mockLogin, isLoading } = useAppContext();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = () => {
    if (!email.trim()) {
      setError("Merci de saisir un email.");
      return;
    }
    setError("");
    mockLogin(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-3xl mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <header className="flex items-center justify-between bg-white rounded-xl shadow p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏦</span>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-800">
                  Mobile Banque
                </h1>
                <p className="text-sm text-gray-500">
                  Bonjour, <span className="font-semibold">{user?.name}</span>
                </p>
              </div>
            </div>
          </header>
          <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
            My Banque App
          </h1>
          <nav className="flex gap-2 mb-6">
            <button
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Tableau de bord
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                activeTab === "transfer"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("transfer")}
            >
              Nouveau transfert
            </button>
          </nav>
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="ex: alice@banque.com"
                className="w-64 mx-auto block px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4 mt-8">Mes comptes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {accounts.map((account: AccountType) => (
              <div
                key={account.id}
                className={`p-4 rounded-xl shadow border-2 cursor-pointer transition ${
                  selectedAccount?.id === account.id
                    ? "border-blue-500 bg-blue-50 scale-105"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedAccount(account)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl text-blue-400">💳</span>
                  <span className="font-mono text-sm text-gray-500">
                    Compte N°
                  </span>
                </div>
                <div className="font-mono text-sm mb-2 break-all">
                  {account.accountNumber}
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {account.balance.toFixed(2)} FCFA
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-4 mt-8">
            Historique des transactions
          </h2>
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    De
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    Vers
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, idx) => (
                  <tr
                    key={transaction.id}
                    className={idx % 2 === 0 ? "bg-blue-50" : ""}
                  >
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {/* date formatée */}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono text-gray-500">
                      {/* sender */}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono text-gray-500">
                      {/* receiver */}
                    </td>
                    <td
                      className={`px-4 py-2 text-sm font-bold ${
                        transaction.sender.id === selectedAccount?.id
                          ? "text-red-500"
                          : "text-green-600"
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
        </div>
      </div>
    </div>
  );
};
