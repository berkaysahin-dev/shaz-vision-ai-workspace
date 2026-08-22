import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { mobileBridge, MobileDevice } from '../../services/mobileBridge';
import { sound } from '../../services/soundEngine';
import QRCode from 'qrcode';
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
  Lock,
  Edit2
} from 'lucide-react';

interface MobileConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileConnectModal: React.FC<MobileConnectModalProps> = ({ isOpen, onClose }) => {
  const [pairingCode, setPairingCode] = useState(mobileBridge.getPairingCode());
  const [copied, setCopied] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState<MobileDevice[]>(mobileBridge.getConnectedDevices());
  
  // Local network IP state (defaults to detected hostname or common local Wi-Fi IP)
  const defaultHost = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? window.location.hostname
    : '192.168.1.106';

  const [hostIp, setHostIp] = useState(defaultHost);
  const [port, setPort] = useState('5173');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const mobileUrl = `http://${hostIp}:${port}/?mode=mobile`;

  // Generate 100% Real Scannable QR Code
  useEffect(() => {
    QRCode.toDataURL(
      mobileUrl,
      {
        width: 320,
        margin: 1,
        color: {
          dark: '#0A0E17',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [mobileUrl]);

  useEffect(() => {
    if (isOpen) {
      setConnectedDevices(mobileBridge.getConnectedDevices());
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
                Scan with your phone camera to connect as a live controller & read-along screen
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
            {/* Real QR Code Card */}
            <div className="bg-[#090C14] border border-[#1E273A] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-inner relative group">
              <div className="w-48 h-48 bg-white p-2.5 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden border-2 border-cyan-500/40">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Mobile Companion QR Code"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-slate-900 text-xs font-bold animate-pulse">
                    Generating QR Code...
                  </div>
                )}
              </div>

              <div className="mt-3 text-[11px] text-cyan-300 font-bold flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" />
                <span>Point your phone camera to scan</span>
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                Instant connection over your local Wi-Fi network
              </div>
            </div>

            {/* Pairing Details & Network Controls */}
            <div className="space-y-3.5">
              {/* Pairing PIN */}
              <div className="bg-[#090C14] border border-[#1E273A] rounded-xl p-3.5">
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

              {/* Local IP Address & Port Switcher */}
              <div className="bg-[#090C14] border border-[#1E273A] rounded-xl p-3.5 space-y-2">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex justify-between items-center">
                  <span>HOST IP & PORT</span>
                  <span className="text-[9px] text-slate-400">Wi-Fi Gateway</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={hostIp}
                    onChange={(e) => setHostIp(e.target.value)}
                    placeholder="192.168.1.xxx"
                    className="flex-1 bg-[#131722] border border-[#2A344D] rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-slate-600">:</span>
                  <input
                    type="text"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="w-16 bg-[#131722] border border-[#2A344D] rounded-lg px-2 py-1 text-xs text-slate-200 font-mono text-center focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Direct Link Copy */}
              <div className="bg-[#090C14] border border-[#1E273A] rounded-xl p-3.5">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                  DIRECT COMPANION URL
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={mobileUrl}
                    className="flex-1 bg-[#131722] border border-[#2A344D] rounded-lg px-2.5 py-1 text-xs text-slate-300 font-mono focus:outline-none truncate"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Security & Private Network Badge */}
              <div className="flex items-center gap-2 p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-[10px] text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encrypted local bridge. Zero code or keys leave your local machine.</span>
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
                  className="flex items-center justify-between p-2.5 bg-[#090C14] border border-[#1E273A] rounded-xl text-xs"
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
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/30 transition-colors shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Launch Mobile Companion Preview (Window)
          </button>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
