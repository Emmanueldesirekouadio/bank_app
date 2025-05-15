import { useState } from "react";
import { useAuth } from "../../context/AppContext";
import { TransferForm } from "../transactions/TransferForm";
import { AccountDashboard } from "./AccountDashboard";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl animate-fadeIn">
        {/* Header */}
        <header className="bg-blue-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏦</span>
            <div>
              <h1 className="text-2xl font-bold">Banque ReactFin</h1>
              <p className="text-sm">
                Bonjour, <span className="font-semibold">{user}</span>
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition duration-200"
          >
            Déconnexion
          </button>
        </header>

        {/* Navigation */}
        <nav className="flex border-b bg-gray-50 rounded-b-lg">
          <button
            className={`flex-1 px-4 py-3 font-medium transition ${
              activeTab === "dashboard"
                ? "border-b-4 border-blue-500 text-blue-600 bg-white"
                : "text-gray-500 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Tableau de bord
          </button>
          <button
            className={`flex-1 px-4 py-3 font-medium transition ${
              activeTab === "transfer"
                ? "border-b-4 border-blue-500 text-blue-600 bg-white"
                : "text-gray-500 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("transfer")}
          >
            Nouveau transfert
          </button>
        </nav>

        {/* Contenu principal */}
        <div className="p-6">
          {activeTab === "dashboard" ? <AccountDashboard /> : <TransferForm />}
        </div>
      </div>
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};
