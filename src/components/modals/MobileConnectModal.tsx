import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { mobileBridge, MobileDevice } from '../../services/mobileBridge';
import { sound } from '../../services/soundEngine';
import { 
  X, 
  Smartphone, 
  QrCode, 
  Wifi, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw,
  Radio,
  Lock
} from 'lucide-react';

interface MobileConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileConnectModal: React.FC<MobileConnectModalProps> = ({ isOpen, onClose }) => {
  const [pairingCode, setPairingCode] = useState(mobileBridge.getPairingCode());
  const [copied, setCopied] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState<MobileDevice[]>(mobileBridge.getConnectedDevices());

  useEffect(() => {
    if (isOpen) {
      setConnectedDevices(mobileBridge.getConnectedDevices());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
  const mobileUrl = `${currentOrigin}/?mode=mobile`;

  const handleCopyUrl = () => {
    sound.playClick();
    navigator.clipboard.writeText(mobileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshCode = () => {
    sound.playClick();
    const newCode = mobileBridge.generateNewPairingCode();
    setPairingCode(newCode);
  };

  const handleOpenCompanionTab = () => {
    sound.playSuccess();
    window.open(mobileUrl, '_blank', 'width=420,height=840');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D1019] border border-[#263147] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E273A] bg-[#111624]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                MOBILE COMPANION & REMOTE GATEWAY
              </h2>
              <p className="text-[11px] text-slate-400">
                Connect your phone as an AI office remote controller & read-along companion
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* QR Code Card */}
            <div className="bg-[#090C14] border border-[#1E273A] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-inner relative group">
              <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden">
                {/* SVG Pixel QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M10 10h30v30h-30z M15 15h20v20h-20z M60 10h30v30h-30z M65 15h20v20h-20z M10 60h30v30h-30z M15 65h20v20h-20z M45 10h10v10h-10z M45 30h10v20h-10z M45 60h10v10h-10z M60 45h20v10h-20z M60 60h10v20h-10z M80 60h10v30h-10z M20 45h20v10h-20z M75 75h15v15h-15z"
                    fill="#0F172A"
                  />
                  {/* Central Cyber Logo */}
                  <rect x="42" y="42" width="16" height="16" fill="#00E5FF" rx="3" />
                  <circle cx="50" cy="50" r="4" fill="#0F172A" />
                </svg>
              </div>

              <div className="mt-3 text-[11px] text-slate-400">
                Scan with your phone's camera on the same Wi-Fi network
              </div>
            </div>

            {/* Pairing Details & Status */}
            <div className="space-y-4">
              {/* Pairing Code */}
              <div className="bg-[#090C14] border border-[#1E273A] rounded-xl p-4">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex justify-between items-center">
                  <span>ONE-TIME PAIRING PIN</span>
                  <button 
                    onClick={handleRefreshCode}
                    title="Generate new PIN" 
                    className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 text-[9px]"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    New PIN
                  </button>
                </div>
                <div className="text-2xl font-bold text-cyan-400 tracking-widest font-mono">
                  {pairingCode}
                </div>
              </div>

              {/* Network Address */}
              <div className="bg-[#090C14] border border-[#1E273A] rounded-xl p-4">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                  DIRECT LOCAL URL
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={mobileUrl}
                    className="flex-1 bg-[#131722] border border-[#2A344D] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Security & Private Network Badge */}
              <div className="flex items-center gap-2 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encrypted local bridge. No keys or code leave your local machine.</span>
              </div>
            </div>
          </div>

          {/* Connected Companion Devices List */}
          <div className="border-t border-[#1E273A] pt-4">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                ACTIVE COMPANION SESSIONS ({connectedDevices.length})
              </span>
              <span className="text-[9px] text-emerald-400 font-bold">● GATEWAY READY</span>
            </div>

            <div className="space-y-2">
              {connectedDevices.map((dev) => (
                <div 
                  key={dev.id}
                  className="flex items-center justify-between p-3 bg-[#090C14] border border-[#1E273A] rounded-xl text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="font-bold text-slate-200">{dev.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{dev.ipAddress}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400">Connected {dev.connectedAt}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-[9px]">
                      LIVE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1E273A] bg-[#111624]">
          <button
            onClick={handleOpenCompanionTab}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/30 transition-all shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Launch Mobile Companion Preview (Window)
          </button>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
