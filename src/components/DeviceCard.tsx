import { useState } from "react";
import type { Device } from "../types";
import { MirrorButton } from "./MirrorButton";
import { MirrorStatus } from "./MirrorStatus";

interface DeviceCardProps {
  device: Device;
  onConnect?: (device: Device) => void;
  onDisconnect?: (device: Device) => void;
  onEnableWireless?: (device: Device) => void;
}

export function DeviceCard({ device, onConnect, onDisconnect, onEnableWireless }: DeviceCardProps) {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [isMirroring, setIsMirroring] = useState(false);
  
  const isConnected = device.status === "Connected";
  const isWireless = device.connection_type === "Wireless";
  const isUSB = device.connection_type === "USB";

  // Status badge color
  const statusColor = {
    Connected: "bg-green-100 text-green-800 border-green-200",
    Disconnected: "bg-gray-100 text-gray-800 border-gray-200",
    Unauthorized: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Offline: "bg-red-100 text-red-800 border-red-200",
  }[device.status];

  const handleSessionStart = (newSessionId: string) => {
    setSessionId(newSessionId);
    setIsMirroring(true);
  };

  const handleSessionEnd = () => {
    setSessionId(undefined);
    setIsMirroring(false);
  };

  const handleCrashDetected = () => {
    console.warn(`Session crashed for device: ${device.name}`);
    // Auto-cleanup the UI state when crash is detected
    setTimeout(() => {
      handleSessionEnd();
    }, 3000); // Wait 3 seconds to show the crash message
  };

  return (
    <div className="card p-5 animate-slide-up hover:scale-[1.02] transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{device.name}</h3>
          <p className="text-sm text-gray-600 font-medium">{device.model}</p>
          <p className="text-xs text-gray-500 mt-1 font-mono">ID: {device.id}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span className={`badge ${statusColor}`}>
            {device.status}
          </span>
          <span className={`badge ${
            isWireless ? "badge-info" : "bg-purple-100 text-purple-800 border-purple-200"
          }`}>
            {device.connection_type}
          </span>
        </div>
      </div>

      {device.ip_address && (
        <div className="mb-3 text-sm text-gray-600">
          <span className="font-medium">IP:</span> {device.ip_address}
        </div>
      )}

      {/* Mirroring Status */}
      {isMirroring && sessionId && (
        <div className="mb-3">
          <MirrorStatus 
            sessionId={sessionId} 
            deviceName={device.name}
            onCrashDetected={handleCrashDetected}
          />
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        {/* Mirror Button */}
        {isConnected && (
          <MirrorButton
            device={device}
            sessionId={sessionId}
            isActive={isMirroring}
            onSessionStart={handleSessionStart}
            onSessionEnd={handleSessionEnd}
          />
        )}

        {/* Wireless/Connection Controls */}
        <div className="flex gap-2">
          {isUSB && isConnected && onEnableWireless && (
            <button
              onClick={() => onEnableWireless(device)}
              className="flex-1 btn-primary text-sm py-2"
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              Enable Wireless
            </button>
          )}
          
          {isWireless && !isConnected && onConnect && (
            <button
              onClick={() => onConnect(device)}
              className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium shadow-sm"
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Connect
            </button>
          )}
          
          {isWireless && isConnected && onDisconnect && (
            <button
              onClick={() => onDisconnect(device)}
              className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium shadow-sm"
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
