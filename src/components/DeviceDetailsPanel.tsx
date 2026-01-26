import { Play, Wifi, FileText, Smartphone, Usb, X } from "lucide-react";
import type { Device, MirrorSession } from "../types";

interface DeviceDetailsPanelProps {
    device: Device | null;
    session: MirrorSession | null;
    onMirror: () => void;
    // onEnableWireless: () => void;
    onViewLogs: () => void;
    onClose: () => void;
}

export function DeviceDetailsPanel({
    device,
    session,
    onMirror,
    // onEnableWireless,
    onViewLogs,
    onClose,
}: DeviceDetailsPanelProps) {
    if (!device) {
        return (
            <aside className="w-56 bg-white border-l border-gray-200 p-4">
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <Smartphone size={48} className="mb-3 opacity-50" />
                    <p className="text-sm text-center">Select a device to view details</p>
                </div>
            </aside>
        );
    }

    const isConnected = device.status === "Connected";
    const isUSB = device.connection_type === "USB";
    const isMirroring = !!session;

    return (
        <aside className="w-56 bg-white border-l border-gray-200 p-4 relative">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X size={16} />
            </button>

            {/* Device Icon */}
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <div className="w-16 h-24 bg-gradient-to-b from-cyan-100 to-cyan-50 rounded-xl border-2 border-cyan-200 flex items-end justify-center pb-1">
                        <div className="w-4 h-1 bg-cyan-300 rounded-full"></div>
                    </div>
                    {/* Connection indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${isConnected ? "bg-green-500" : "bg-gray-400"
                        }`}>
                        {isUSB ? (
                            <Usb size={10} className="text-white" />
                        ) : (
                            <Wifi size={10} className="text-white" />
                        )}
                    </div>
                </div>
            </div>

            {/* Device Name */}
            <h3 className="text-center font-semibold text-gray-800 mb-1">
                {device.name}
            </h3>
            {device.ip_address && (
                <p className="text-center text-xs text-gray-400 mb-4">
                    {device.ip_address}
                </p>
            )}

            {/* Status Badge */}
            {!isConnected && (
                <div className="text-center mb-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded ${device.status === "Unauthorized"
                        ? "bg-yellow-100 text-yellow-700"
                        : device.status === "Offline"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                        {device.status}
                    </span>
                </div>
            )}

            {/* Mirroring Status */}
            {isMirroring && (
                <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-700 font-medium">Mirroring Active</span>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-1">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Quick Actions
                </h4>

                <button
                    onClick={onMirror}
                    disabled={!isConnected}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Play size={16} className="text-gray-500" />
                    <span>{isMirroring ? "Stop Mirror" : "Mirror"}</span>
                </button>

                {/* {isUSB && (
                    <button
                        onClick={onEnableWireless}
                        disabled={!isConnected}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Wifi size={16} className="text-gray-500" />
                        <span>Enable Wireless</span>
                    </button>
                )} */}

                <button
                    onClick={onViewLogs}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <FileText size={16} className="text-gray-500" />
                    <span>View Logs</span>
                </button>
            </div>
        </aside>
    );
}
