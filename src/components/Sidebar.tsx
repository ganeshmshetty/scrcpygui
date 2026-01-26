import { Home, Settings, LucideIcon } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
    const [width, setWidth] = useState(240);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                const newWidth = mouseMoveEvent.clientX;
                if (newWidth > 64 && newWidth < 480) {
                    setWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <aside
            ref={sidebarRef}
            style={{ width }}
            className="bg-white border-r border-gray-200 flex flex-col relative flex-shrink-0 group"
        >
            {/* Resizer Handle */}
            <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-cyan-500 transition-colors z-10 ${isResizing ? "bg-cyan-500" : "bg-transparent group-hover:bg-gray-200"
                    }`}
                onMouseDown={startResizing}
            />

            {/* Logo */}
            <div className="p-4 flex items-center gap-2 overflow-hidden whitespace-nowrap">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                {width > 100 && <span className="font-bold text-gray-800">Mirin</span>}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-hidden">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors whitespace-nowrap ${isActive
                                ? "bg-cyan-500 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                            title={width <= 100 ? item.label : undefined}
                        >
                            <Icon size={20} className="flex-shrink-0" />
                            {width > 100 && <span className="font-medium">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
