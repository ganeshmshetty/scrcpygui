import "./App.css";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { SettingsPage } from "./pages/SettingsPage";
import { ToastProvider } from "./components/ToastProvider";
import { ConfirmDialogProvider } from "./components/ConfirmDialog";
import { InputDialogProvider } from "./components/InputDialog";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <ConfirmDialogProvider>
      <InputDialogProvider>
        <ToastProvider>
          <div className="h-screen flex bg-gray-50">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
              <div key={activeTab} className="flex-1 flex w-full h-full animate-simple-fade">
                {activeTab === "home" && <Home />}
                {activeTab === "settings" && <SettingsPage />}
              </div>
            </main>
          </div>
        </ToastProvider>
      </InputDialogProvider>
    </ConfirmDialogProvider>
  );
}

export default App;
