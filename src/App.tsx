import "./App.css";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { SettingsPage } from "./pages/SettingsPage";
import { ToastProvider } from "./components/ToastProvider";
import { ConfirmDialogProvider } from "./components/ConfirmDialog";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <ConfirmDialogProvider>
      <ToastProvider>
        <div className="h-screen flex bg-gray-50">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content */}
          <div className="flex-1 flex">
            {activeTab === "home" && <Home />}
            {activeTab === "settings" && <SettingsPage />}
          </div>
        </div>
      </ToastProvider>
    </ConfirmDialogProvider>
  );
}

export default App;
