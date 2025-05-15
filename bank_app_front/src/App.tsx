import "./App.css";
import { LoginScreen } from "./components/auth/LoginScreen";
import { Notification } from "./components/common/Notification";
import { Dashboard } from "./components/dashboard/Dashboard";
import { AppProvider, useAppContext } from "./context/AppContextProvider";

const AppContent = () => {
  const { user, notification, transactions } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="max-w-6xl mx-auto">
        {!user ? <LoginScreen /> : <Dashboard />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
