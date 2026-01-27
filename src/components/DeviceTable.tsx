import { Play, Wifi, Usb, AlertCircle, Trash2, MoreVertical, Edit2, Smartphone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Device, MirrorSession } from "../types";
import { useInputDialog } from "./InputDialog";

interface DeviceTableProps {
    devices: Device[];
    sessions: MirrorSession[];
    isLoading: boolean;
    onStartMirroring: (device: Device) => void;
    onStopMirroring: (sessionId: string) => void;
    onRemoveDevice: (deviceId: string) => void;
    onRenameDevice: (deviceId: string, newName: string) => void;
}



export function DeviceTable({
    devices,
    sessions,
    isLoading,
    onStartMirroring,
    onStopMirroring,
    onRemoveDevice,
    onRenameDevice,
}: DeviceTableProps) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const { prompt } = useInputDialog();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (target.closest('[data-menu-toggle]')) return;

            if (menuRef.current && !menuRef.current.contains(target as Node)) {
                setOpenMenuId(null);
            }
        }

        function handleScroll() {
            if (openMenuId) setOpenMenuId(null);
        }

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleScroll);
        };
    }, [openMenuId]);

    const getSessionForDevice = (deviceId: string) => {
        return sessions.find((s) => s.device_id === deviceId);
    };

    const activeDevice = devices.find(d => d.id === openMenuId);

    if (isLoading && devices.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mb-4" />
                <p className="text-gray-400 font-medium">Scanning for devices...</p>
            </div>
        );
    }

    if (devices.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                    <Smartphone size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">No devices found</h3>
                <p className="text-gray-400 max-w-xs mx-auto">
                    Connect your device via USB to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {devices.map((device) => {
                const session = getSessionForDevice(device.id);
                const isMirroring = !!session;
                const isMenuOpen = openMenuId === device.id;
                const isOffline = device.status === "Offline";
                const isUnauthorized = device.status === "Unauthorized";

                return (
                    <div
                        key={device.id}
                        className="group relative flex items-center gap-4 p-4 rounded-xl border bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                        {/* 1. Icon */}
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors bg-gray-50 text-gray-500 group-hover:bg-gray-100">
                            {device.connection_type === "Wireless" ? (
                                <Wifi size={20} />
                            ) : (
                                <Usb size={20} />
                            )}
                        </div>

                        {/* 2. Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate text-gray-900">
                                {device.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mt-0.5">
                                <span>{device.id}</span>
                                {(device.model && device.model !== device.name) && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span className="truncate">{device.model}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* 3. Status & Actions */}
                        <div className="flex items-center gap-3">
                            {/* Connection Status Pill */}
                            {isUnauthorized ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-medium border border-yellow-100">
                                    <AlertCircle size={12} />
                                    Unauthorized
                                </span>
                            ) : isOffline ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                    Offline
                                </span>
                            ) : (
                                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Connected
                                </span>
                            )}

                            {/* Mirror Action */}
                            {device.status === "Connected" && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isMirroring) {
                                            onStopMirroring(session.session_id);
                                        } else {
                                            onStartMirroring(device);
                                        }
                                    }}
                                    className={`relative z-10 px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isMirroring
                                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
                                        : "bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm hover:shadow"
                                        }`}
                                >
                                    {isMirroring ? (
                                        <>Stop</>
                                    ) : (
                                        <>
                                            Mirror
                                            <Play size={14} className="ml-0.5 fill-current" />
                                        </>
                                    )}
                                </button>
                            )}

                            {/* Context Menu Toggle */}
                            <button
                                data-menu-toggle={device.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setMenuPosition({
                                        top: rect.bottom + 8,
                                        right: window.innerWidth - rect.right
                                    });
                                    setOpenMenuId(isMenuOpen ? null : device.id);
                                }}
                                className={`p-2 rounded-lg transition-colors relative z-10 outline-none ${isMenuOpen
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                    }`}
                            >
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Fixed Menu Rendering */}
            {openMenuId && activeDevice && menuPosition && (
                <div
                    ref={menuRef}
                    style={{
                        position: 'fixed',
                        top: menuPosition.top,
                        right: menuPosition.right,
                        zIndex: 9999
                    }}
                    className="w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 animate-scale-in origin-top-right"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={async () => {
                            const newName = await prompt({
                                title: "Rename Device",
                                defaultValue: activeDevice.name,
                                confirmText: "Rename",
                                placeholder: "Enter new name"
                            });
                            if (newName && newName !== activeDevice.name) {
                                onRenameDevice(activeDevice.id, newName);
                            }
                            setOpenMenuId(null);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
                    >
                        <Edit2 size={14} className="text-gray-400" />
                        Rename
                    </button>
                    <button
                        onClick={() => {
                            onRemoveDevice(activeDevice.id);
                            setOpenMenuId(null);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                    >
                        <Trash2 size={14} />
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
}
