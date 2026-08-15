import React from 'react';
import { Bell, Check, GitPullRequest, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';

export const NotificationDrawer: React.FC = () => {
  const { notifications, isNotificationOpen, setIsNotificationOpen, markNotificationsAsRead } = useWorkspace();

  if (!isNotificationOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'pr': return <GitPullRequest className="w-4 h-4 text-purple-400" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default: return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        className="w-80 md:w-96 bg-[#10131E] border-l border-[#242C42] shadow-2xl h-full flex flex-col justify-between p-4 font-mono select-none animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#1E263B]">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-sm text-slate-100 uppercase tracking-wider">
                Notifications
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                {notifications.filter((n) => !n.read).length} new
              </span>
            </div>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-between items-center py-2 text-[10px] text-slate-400">
            <span>LIVE AGENT ACTIVITY</span>
            <button
              onClick={markNotificationsAsRead}
              className="text-cyan-400 hover:text-cyan-300 font-bold"
            >
              Mark all as read
            </button>
          </div>

          {/* List */}
          <div className="space-y-2.5 mt-2 overflow-y-auto max-h-[75vh] pr-1">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-all ${
                  !item.read
                    ? 'bg-[#141928] border-purple-500/40 shadow-sm'
                    : 'bg-[#0B0D15] border-[#1C2336] text-slate-400'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#0A0D15] border border-[#232B40] mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {item.message}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1.5 font-mono">
                      {item.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1E263B] text-center text-[10px] text-slate-500">
          Shaz Vision AI Telemetry Daemon
        </div>
      </div>
    </div>
  );
};
