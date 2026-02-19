"use client";

import { Info } from "lucide-react";

interface MonitorCardProps {
  title: string;
  value: number;
  unit: string;
  lastUpdate: string;
  color: "yellow" | "gray" | "white";
  icon: "voltage" | "current" | "power" | "total" | "frequency" | "pf" | "energy";
}

export default function MonitorCard({
  title,
  value,
  unit,
  lastUpdate,
  color,
  icon,
}: MonitorCardProps) {
  const colorClasses = {
    yellow: "border-yellow-400 bg-yellow-50",
    gray: "border-gray-300 bg-gray-50",
    white: "border-gray-200 bg-white",
  };

  const getIcon = () => {
    const iconClass = "w-8 h-8 text-gray-400";
    
    switch (icon) {
      case "voltage":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
            <path d="M8 12h8M12 8v8" strokeWidth="2" />
          </svg>
        );
      case "current":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" />
            <line x1="7" y1="12" x2="17" y2="12" strokeWidth="2" />
            <circle cx="17" cy="12" r="1" fill="currentColor" />
          </svg>
        );
      case "power":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path d="M12 3v6M12 15v6" strokeWidth="2" />
          </svg>
        );
      case "total":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path d="M9 9l6 6M15 9l-6 6" strokeWidth="2" />
          </svg>
        );
      case "frequency":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" />
            <path d="M6 12h3l2-4 2 8 2-4h3" strokeWidth="2" />
          </svg>
        );
      case "pf":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
            <path d="M9 12l3 3 6-6" strokeWidth="2" />
          </svg>
        );
      case "energy":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path d="M12 7v5l3 3" strokeWidth="2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-yellow-600">{title}</h3>
        <div className="flex items-center space-x-1">
          <Info className="w-4 h-4 text-gray-400" />
          {getIcon()}
        </div>
      </div>

      <div className="mb-3">
        <span className="text-3xl font-bold text-gray-900">{value.toFixed(1)}</span>
        <span className="text-sm text-gray-600 ml-1">{unit}</span>
      </div>

      <div className="flex items-center text-xs text-red-500">
        <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 2v6M6 10h.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>{lastUpdate}</span>
      </div>
    </div>
  );
}
