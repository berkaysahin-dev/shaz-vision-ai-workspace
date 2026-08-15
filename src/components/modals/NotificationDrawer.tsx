import React from 'react';
import { X, CheckCheck, Bell, AlertTriangle, CheckCircle2, Info, Activity } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { sound } from '../../services/soundEngine';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationsAsRead,
    language,
  } = useWorkspace();

  if (!isNotificationOpen) return null;

  const handleMarkAllRead = () => {
    sound.playSuccess();
    markNotificationsAsRead();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'action':
        return <Activity className="w-4 h-4 text-cyan-400 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-blue-400 shrink-0" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-end font-mono select-none"
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        className="w-full max-w-sm border-l shadow-2xl h-full flex flex-col justify-between p-4 overflow-y-auto animate-in slide-in-from-right duration-200 transition-colors"
        style={{
          backgroundColor: 'var(--app-bg-panel, #0F121C)',
          borderColor: 'var(--app-border, #242D44)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div
            className="flex items-center justify-between pb-3 border-b"
            style={{ borderColor: 'var(--app-border, #1F273D)' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="p-1 rounded border"
                style={{
                  backgroundColor: 'var(--app-badge-bg, rgba(224, 86, 76, 0.2))',
                  borderColor: 'var(--app-accent, #E0564C)',
                  color: 'var(--app-text-accent, #FECDD3)',
                }}
              >
                <Bell className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm text-slate-100">
                {language === 'tr' ? 'Bildirimler' : 'Notifications'}
              </span>
              <span
                className="text-[9px] px-1.5 py-0.2 rounded font-bold border"
                style={{
                  backgroundColor: 'var(--app-badge-bg, rgba(224, 86, 76, 0.2))',
                  borderColor: 'var(--app-accent, #E0564C)',
                  color: 'var(--app-text-accent, #FECDD3)',
                }}
              >
                {notifications.filter((n) => !n.read).length}
              </span>
            </div>

            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of alerts */}
          <div className="space-y-2.5 mt-3.5">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-3 rounded-xl border space-y-1.5 transition-all shadow-sm"
                style={{
                  backgroundColor: notif.read ? 'var(--app-bg-dark, #090B12)' : 'var(--app-bg-surface, #141724)',
                  borderColor: notif.read ? 'var(--app-border, #1A2133)' : 'var(--app-accent, #E0564C)',
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {getIcon(notif.type)}
                    <span className="font-bold text-slate-100">{notif.title}</span>
                  </div>
                  <span className="text-[9px] text-slate-500">{notif.timestamp}</span>
                </div>

                <div className="text-[11px] text-slate-400 leading-normal pl-6">
                  {notif.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div
          className="pt-3 border-t flex items-center justify-between"
          style={{ borderColor: 'var(--app-border, #1F273D)' }}
        >
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'Tümünü okundu say' : 'Mark all as read'}</span>
          </button>

          <button
            onClick={() => setIsNotificationOpen(false)}
            className="px-3 py-1.5 rounded-lg text-white text-xs font-bold transition-all shadow-md active:scale-95"
            style={{ backgroundColor: 'var(--app-accent, #E0564C)' }}
          >
            {language === 'tr' ? 'Kapat' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
