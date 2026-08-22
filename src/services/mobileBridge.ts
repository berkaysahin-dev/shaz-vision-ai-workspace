import { Agent, TaskItem, NotificationItem } from '../types';

export interface MobileDevice {
  id: string;
  name: string;
  platform: 'iOS' | 'Android' | 'Web';
  connectedAt: string;
  lastPing: number;
  ipAddress: string;
}

export interface MobileMessage {
  type: 
    | 'PING' 
    | 'STATE_UPDATE' 
    | 'VOICE_TASK' 
    | 'TASK_ACTION' 
    | 'AGENT_MESSAGE' 
    | 'AGENT_PAUSE' 
    | 'DEVICE_CONNECT';
  payload: any;
  timestamp: number;
  sender: 'desktop' | 'mobile';
  deviceId?: string;
}

type MessageListener = (msg: MobileMessage) => void;

class MobileBridgeService {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<MessageListener> = new Set();
  private connectedDevices: Map<string, MobileDevice> = new Map();
  private pairingCode: string = 'SHAZ-7829';

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('shaz_vision_mobile_bridge');
        this.channel.onmessage = (event) => {
          this.handleIncomingMessage(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported or error:', e);
      }
    }

    // Also listen to storage events as fallback
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'shaz_mobile_bridge_msg' && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            this.handleIncomingMessage(data);
          } catch (err) {}
        }
      });
    }

    // Default simulated paired device
    this.connectedDevices.set('dev-iphone15', {
      id: 'dev-iphone15',
      name: 'Berkay’s iPhone 15 Pro',
      platform: 'iOS',
      connectedAt: '12 mins ago',
      lastPing: Date.now(),
      ipAddress: '192.168.1.142 (Tailscale 100.84.12.9)',
    });
  }

  public getPairingCode(): string {
    return this.pairingCode;
  }

  public generateNewPairingCode(): string {
    const random = Math.floor(1000 + Math.random() * 9000);
    this.pairingCode = `SHAZ-${random}`;
    return this.pairingCode;
  }

  public getConnectedDevices(): MobileDevice[] {
    return Array.from(this.connectedDevices.values());
  }

  public addListener(listener: MessageListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public send(type: MobileMessage['type'], payload: any, sender: 'desktop' | 'mobile' = 'desktop') {
    const message: MobileMessage = {
      type,
      payload,
      timestamp: Date.now(),
      sender,
      deviceId: sender === 'mobile' ? 'mobile-active' : 'desktop-hq',
    };

    if (this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (e) {}
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('shaz_mobile_bridge_msg', JSON.stringify(message));
      } catch (e) {}
    }

    // Notify local listeners
    this.listeners.forEach((listener) => listener(message));
  }

  private handleIncomingMessage(msg: MobileMessage) {
    if (!msg || !msg.type) return;

    if (msg.type === 'DEVICE_CONNECT' && msg.payload) {
      this.connectedDevices.set(msg.payload.id || 'dev-new', {
        id: msg.payload.id || 'dev-new',
        name: msg.payload.name || 'Mobile Client',
        platform: msg.payload.platform || 'Web',
        connectedAt: 'Just now',
        lastPing: Date.now(),
        ipAddress: msg.payload.ipAddress || '192.168.1.xxx',
      });
    }

    this.listeners.forEach((listener) => listener(msg));
  }
}

export const mobileBridge = new MobileBridgeService();
