import { useState, useEffect } from "react";
import { DeviceList } from "../components/DeviceList";
import { ActiveSessions } from "../components/ActiveSessions";
import { ProcessManager } from "../components/ProcessManager";
import { WirelessSetupWizard } from "../components/WirelessSetupWizard";
import { IPInputDialog } from "../components/IPInputDialog";
import { SavedDevicesList } from "../components/SavedDevicesList";
import { deviceService } from "../services";
import type { Device } from "../types";

export function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [showIPDialog, setShowIPDialog] = useState(false);

  const loadDevices = async () => {
    try {
      const deviceList = await deviceService.getConnectedDevices();
      setDevices(deviceList);
    } catch (err) {
      console.error("Error loading devices:", err);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  const handleWizardComplete = () => {
    setShowWizard(false);
    loadDevices();
  };

  const handleIPDialogComplete = () => {
    setShowIPDialog(false);
    loadDevices();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Scrcpy GUI</h1>
          <p className="text-gray-600">Android Device Screen Mirroring</p>
        </div>

        {/* Wireless Connection Actions */}
        <div className="mb-6 flex gap-4 justify-center">
          <button
            onClick={() => setShowWizard(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
            Wireless Setup Wizard
          </button>
          <button
            onClick={() => setShowIPDialog(true)}
            className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Connect by IP
          </button>
        </div>

        {/* Saved Devices */}
        <div className="mb-6">
          <SavedDevicesList onDeviceConnected={loadDevices} />
        </div>
        
        {/* Process Manager */}
        <div className="mb-6">
          <ProcessManager />
        </div>

        {/* Active Sessions */}
        <div className="mb-6">
          <ActiveSessions />
        </div>

        {/* Device List */}
        <DeviceList />
      </div>

      {/* Wireless Setup Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <WirelessSetupWizard
            devices={devices}
            onComplete={handleWizardComplete}
            onCancel={() => setShowWizard(false)}
          />
        </div>
      )}

      {/* IP Input Dialog */}
      {showIPDialog && (
        <IPInputDialog
          onComplete={handleIPDialogComplete}
          onCancel={() => setShowIPDialog(false)}
        />
      )}
    </div>
  );
}
