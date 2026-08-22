# Shaz Vision AI Workspace

[![Version](https://img.shields.io/badge/version-v0.4.0--beta-7C3AED?style=flat-square)](https://github.com/berkaysahin-dev/shaz-vision-ai-workspace/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Mobile-1E293B?style=flat-square)](https://github.com/berkaysahin-dev/shaz-vision-ai-workspace)
[![Author](https://img.shields.io/badge/author-@berkaysahin--dev-181717?logo=github&logoColor=white&style=flat-square)](https://github.com/berkaysahin-dev)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron&logoColor=white&style=flat-square)](https://www.electronjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![MCP](https://img.shields.io/badge/Protocol-MCP%20Ready-10B981?style=flat-square)](https://modelcontextprotocol.io/)

**Shaz Vision AI Workspace** is an open-source, desktop-native & mobile-connected multi-agent orchestration operating system and virtual company simulator. Designed for autonomous software development and management workflows, it unifies a 2D pixel-art virtual office, customizable drag-and-drop workspace layout, tiled concurrent terminal grid, headless browser simulator, Kanban task board, mobile read-along companion, character wardrobe studio, and Model Context Protocol (MCP) tool integrations in a single unified interface.

Created and maintained by [@berkaysahin-dev](https://github.com/berkaysahin-dev).

---

## Key Features & Highlights

### 1. 🔀 Customizable Drag & Drop Workspace (Modular Multi-Pane Layout)
- **Fluid Drag & Drop Reordering:** Grab any panel header (`office`, `terminals`, `tasks`, `browser`, `mcp`, `code`) and drop it into any column or slot.
- **Preset Layout Switcher:** Instant single-click switching between curated layouts:
  - **3-Column Grid:** Full studio mode (Office + Multi-Terminal + Tool Suite).
  - **Office Focus:** 60% expansive 2D pixel office canvas with side terminals.
  - **Terminal Focus:** 70% concurrent terminal grid for heavy execution monitoring.
  - **Browser & DevOps:** Split code editor and live DOM browser visualizer.
- **Pane Management:** Instant per-pane **Maximize (Full-Screen)**, **Hide/Restore**, and **Reset to Default**. Layout states persist in local storage.

### 2. 📱 Mobile Companion Mode & QR Gateway (Second Screen)
- **Local Network QR Connect:** Instant camera QR code scanning from your smartphone (`/?mode=mobile`) on the same local network / VPN.
- **Mobile Read-Along Stream:** Real-time log monitoring from active agent terminals with auto-scroll and stream pause.
- **1-Tap Approvals:** One-tap **Approve & Ship** or **Reject** on pending agent pull requests, migrations, and deployment permissions.
- **Push-to-Talk Voice Dispatch:** Speak in Turkish or English via Web Speech API; audio is transcribed locally and dispatched directly to desktop agents.
- **Zero Cloud Leak:** Source code and credentials remain exclusively on your local desktop disk.

### 3. 🎨 2D Pixel-Art Virtual Office & Character Studio
- **11 Specialized Departmental Labs (Multi-Floor View):**
  - Architecture Lab, Core Backend Lab, Fullstack Studio, Frontend & QA Lab, Design Studio.
  - **New R&D Labs:** AI Research & Neural Lab, Mobile & Cross-Platform Studio, Red Team Cyber Matrix, Data Science & ML Vault, UX Creative Lounge & Arcade.
- **Interactive Character Studio & Wardrobe:**
  - 10-color outfit customizer with instant sprite preview.
  - **Cyber Accessories:** Cyber Glowing Visor 🕶️, Smart Glasses 👓, RGB Gamer Headset 🎧, Hacker Stealth Mask 🥷, Party Hat 🥳, Artist Beret 🎨.
  - **Robotic & Desk Companions:** Animated Cyber Cat 🐱, Pixel Dog 🐶, Floating Mini Drone 🛸, Yellow Rubber Duck 🦆.
  - **Animation Triggers:** Deep Focus Flow (⚡), Coffee Break (☕), Victory Confetti (🎉), Bug Flare Alert (🚨).
- **Smooth Agent Navigation:** Autonomous wandering, desk visits, and interactive speech bubbles.

### 4. 💻 Tiled Multi-Terminal Grid & Code Workspace
- **Concurrent Execution:** Multiple terminal streams running compilation, test runners, and fuzzing concurrently.
- **Interactive Shell Input:** Terminal CLI prompts supporting `test`, `build`, `scan`, `clear`, and custom scripts.
- **Integrated Code Editor:** Multi-tab file viewer and editor with live syntax highlighting and modification saves.

### 5. 🌐 Headless Browser Simulator & Live DOM Visualizer
- **Responsive Viewport Switcher:** Desktop (1440x900) and Mobile (375x812) rendering.
- **Step-by-Step Tool Trace:** Autonomous browser action logs (Navigation, Selectors, Form Fills, Clicks, Screenshots).
- **Live DevTools Console:** HTTP response status codes, latency gauges, and console output.

### 6. 🔌 Model Context Protocol (MCP) Hub
- Visual connector status and latency telemetry for MCP servers:
  - GitHub Protocol Server, Filesystem Adapter, Headless Browser Runner, PostgreSQL Adapter, Sandbox CLI.

### 7. 🔊 Web Audio API Retro Sound Engine
- Real-time synthesized 8-bit mechanical keyboard clicks, sci-fi chimes, and action alerts with mute toggle.

---

## 👥 AI Crew Roster (13 Specialized Agents)

| Agent Name | Role | Department | Default Model | Primary Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Ada** | Lead Architect | Architecture & Design | Claude 3.5 Sonnet | System architecture, schema modeling, code review |
| **Nova** | Backend Developer | Core Backend Lab | gpt-5-codex | Webhook reliability, exponential jitter, API endpoints |
| **Emre** | Fullstack Developer | Fullstack Studio | Fable 5 | Progressive onboarding wizards, auth integration |
| **Kai** | Frontend Engineer | Frontend & QA Lab | Fable 5 | Playwright test suites, e2e regression testing |
| **Rio** | Product Designer | Design Studio | Claude 3.5 Sonnet | UI design tokens, micro-interactions, responsive UX |
| **Vesper** | Quantum & AI Researcher | AI Research & Neural Lab | Claude 3.7 Sonnet | Transformer attention optimization, reasoning benchmarks |
| **Atlas** | Lead Mobile Architect | Mobile & Cross-Platform Studio | gpt-5-codex | Flutter Wasm engine, SwiftUI & Kotlin native bridges |
| **Nyx** | Red Team Ethical Hacker | Red Team Cyber Matrix | DeepSeek V3 | Automated fuzzing, memory safety, exploit defense |
| **Echo** | Data Science & MLOps | Data Science & ML Vault | Gemini 1.5 Pro | Vector pipeline indexing, CUDA / TensorRT optimization |
| **Zoe** | UX Designer & Motion Artist | UX Creative Lounge & Arcade | Claude 3.5 Sonnet | WebGL shaders, design tokens, micro-animations |
| **Lux** | Growth Marketing | Marketing & Operations | GPT-4o | Telemetry analytics, conversion optimization, SEO clusters |
| **Sol** | DevOps & Infra | DevOps & Cloud Matrix | Gemini 1.5 Pro | Orchestration routing, container deployments |
| **Max** | Security Engineer | Security & QA Room | DeepSeek V3 | Vulnerability scanning, OWASP Top 10 compliance |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18.0.0 or higher)
- npm, yarn, or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/berkaysahin-dev/shaz-vision-ai-workspace.git
cd shaz-vision-ai-workspace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run in Development Web Mode
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 4. Run as Native Desktop Application (Electron)
```bash
npm run electron
```

### 5. Launch Mobile Companion Mode
On your smartphone connected to the same Wi-Fi or VPN, open:
```
http://<YOUR_LOCAL_IP>:3000/?mode=mobile
```
Or click **"Mobil Bağlan"** in the top bar to scan the QR code!

### 6. Build for Production
```bash
npm run build
```

---

## ⌨️ Keyboard Shortcuts

- `Ctrl + K` / `Cmd + K`: Open Global Command Palette and Quick Search
- `Escape`: Close active modal or drawer

---

## 🛠️ Technology Stack

- **Frontend Core:** React 18, TypeScript 5.7, Vite 6
- **Desktop Container:** Electron
- **Mobile Companion:** Responsive Progressive Web Interface + BroadcastChannel / WebBridge
- **Styling:** Tailwind CSS, Custom 2D Pixel-Art CSS Engine
- **Icons:** Lucide React
- **Visual Effects:** Canvas Confetti, CSS Animations
- **Audio Engine:** Web Audio API 8-Bit Retro Synthesizer
- **State Management:** React Context API

---

## 👤 Author

Developed and maintained by **Berkay Şahin** ([@berkaysahin-dev](https://github.com/berkaysahin-dev)).

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
