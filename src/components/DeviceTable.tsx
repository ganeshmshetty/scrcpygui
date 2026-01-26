import { Play, Square, Check, Wifi, WifiOff, Usb, AlertCircle, Trash2, MoreVertical, Edit2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Device, MirrorSession } from "../types";

interface DeviceTableProps {
    devices: Device[];
    sessions: MirrorSession[];
    isLoading: boolean;
    selectedDeviceId: string | null;
    onSelectDevice: (deviceId: string) => void;
    onStartMirroring: (device: Device) => void;
    onStopMirroring: (sessionId: string) => void;
    onRemoveDevice: (deviceId: string) => void;
    onRenameDevice: (deviceId: string, newName: string) => void;
}

export function DeviceTable({
    devices,
    sessions,
    isLoading,
    selectedDeviceId,
    onSelectDevice,
    onStartMirroring,
    onStopMirroring,
    onRemoveDevice,
    onRenameDevice,
}: DeviceTableProps) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getSessionForDevice = (deviceId: string) => {
        return sessions.find((s) => s.device_id === deviceId);
    };

    const getConnectionIcon = (device: Device) => {
        if (device.connection_type === "Wireless") {
            return device.status === "Connected" ? (
                <Wifi size={16} className="text-cyan-500" />
            ) : (
                <WifiOff size={16} className="text-gray-400" />
            );
        }
        return <Usb size={16} className="text-purple-500" />;
    };

    const getStatusBadge = (device: Device) => {
        switch (device.status) {
            case "Connected":
                return null; // No badge needed for connected
            case "Unauthorized":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded">
                        <AlertCircle size={12} />
                        Unauthorized
                    </span>
                );
            case "Offline":
                return (
                    <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">
                        Offline
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                        Disconnected
                    </span>
                );
        }
    };

    if (isLoading && devices.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent mb-3"></div>
                    <p className="text-gray-500">Scanning for devices...</p>
                </div>
            </div>
        );
    }

    if (devices.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center py-12">
                    <Usb size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">No devices connected</p>
                    <p className="text-gray-400 text-sm mt-1">
                        Connect a device via USB or use IP Connect
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-gray-100">
                        <th className="py-3 px-4 font-medium w-10"></th>
                        <th className="py-3 px-4 font-medium"></th>
                        <th className="py-3 px-4 font-medium"></th>
                        <th className="py-3 px-4 font-medium text-right"></th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => {
                        const session = getSessionForDevice(device.id);
                        const isActive = !!session;
                        const isSelected = selectedDeviceId === device.id;
                        const isMenuOpen = openMenuId === device.id;

                        return (
                            <tr
                                key={device.id}
                                onClick={() => onSelectDevice(device.id)}
                                className={`border-b border-gray-50 cursor-pointer transition-colors ${isSelected ? "bg-cyan-50" : "hover:bg-gray-50"
                                    }`}
                            >
                                <td className="py-3 px-4">
                                    <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected
                                            ? "bg-cyan-500 border-cyan-500"
                                            : "border-gray-300"
                                            }`}
                                    >
                                        {isSelected && <Check size={14} className="text-white" />}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-800">{device.name}</span>
                                        {getStatusBadge(device)}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {getConnectionIcon(device)}
                                        <span className="text-gray-600 text-sm">
                                            {device.connection_type}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {/* Primary Action: Mirror/Stop */}
                                        {device.status === "Connected" && (
                                            isActive ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onStopMirroring(session.session_id);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                                                    title="Stop Mirroring"
                                                >
                                                    Stop
                                                    <Square size={14} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onStartMirroring(device);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
                                                    title="Start Mirroring"
                                                >
                                                    Mirror
                                                    <Play size={14} />
                                                </button>
                                            )
                                        )}

                                        {/* Secondary Actions: Menu */}
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenuId(isMenuOpen ? null : device.id);
                                                }}
                                                className={`p-1.5 rounded-md transition-colors ${isMenuOpen ? "bg-gray-200 text-gray-800" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"}`}
                                            >
                                                <MoreVertical size={16} />
                                            </button>

                                            {isMenuOpen && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        onClick={() => {
                                                            const newName = window.prompt("Enter new name for device:", device.name);
                                                            if (newName && newName !== device.name) {
                                                                onRenameDevice(device.id, newName);
                                                            }
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Edit2 size={14} />
                                                        Rename
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onRemoveDevice(device.id);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
