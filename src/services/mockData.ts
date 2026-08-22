import { Agent, TerminalPane, TaskItem, ReportItem, BrowserPage, CodeFile, McpServer, NotificationItem, GlobalVoiceState } from '../types';

export const initialAgents: Record<string, Agent> = {
  ada: {
    id: 'ada',
    name: 'Ada',
    role: 'Lead Architect',
    team: 'PRODUCT',
    department: 'Architecture & System Design',
    color: '#A855F7',
    avatarTag: 'AD',
    state: 'WORKING',
    currentTask: 'Architecture Spec',
    currentAction: 'reviewing database schema',
    model: 'Claude 3.5 Sonnet',
    speechBubble: "let's do this",
    roomIndex: 0,
    tokens: 42350,
    cost: 0.63,
    executionTime: '05:12',
    files: ['src/lib/runtime.ts', 'architecture.md', 'prisma/schema.prisma'],
    skills: ['System Design', 'Schema Modeling', 'Code Review'],
    isPaused: false,
    accessory: 'glasses',
    pet: 'mini-drone',
    level: 9,
    xp: 920,
  },
  nova: {
    id: 'nova',
    name: 'Kaan',
    role: 'Backend Developer',
    team: 'PRODUCT',
    department: 'Core Backend Lab',
    color: '#00E5FF',
    avatarTag: 'KN',
    state: 'RUNNING',
    currentTask: 'webhook retry fix',
    currentAction: 'reading src/webhooks/retry.ts',
    model: 'gpt-5-codex',
    speechBubble: 'patching retry jitter',
    roomIndex: 0,
    tokens: 38200,
    cost: 0.24,
    executionTime: '04:45',
    files: ['src/webhooks/retry.ts', 'src/webhooks/signature.ts', 'src/api/webhooks.ts'],
    skills: ['FastAPI / Node', 'Webhook Protocols', 'Async Queues'],
    isPaused: false,
    accessory: 'visor',
    pet: 'cyber-cat',
    level: 8,
    xp: 680,
  },
  emre: {
    id: 'emre',
    name: 'Emre',
    role: 'Fullstack Developer',
    team: 'PRODUCT',
    department: 'Fullstack Studio',
    color: '#10B981',
    avatarTag: 'EM',
    state: 'WORKING',
    currentTask: 'onboarding new UI',
    currentAction: 'reading app/onboarding/page.tsx',
    model: 'Fable 5',
    speechBubble: 'building onboarding wizard',
    roomIndex: 1,
    tokens: 29400,
    cost: 0.44,
    executionTime: '03:30',
    files: ['app/onboarding/page.tsx', 'components/stepper.tsx', 'src/lib/auth.ts'],
    skills: ['React 19', 'Next.js 15', 'Tailwind CSS'],
    isPaused: false,
    accessory: 'headphones',
    pet: 'pixel-dog',
    level: 7,
    xp: 510,
  },
  kai: {
    id: 'kai',
    name: 'Can',
    role: 'Frontend Engineer',
    team: 'PRODUCT',
    department: 'Frontend & QA Lab',
    color: '#3B82F6',
    avatarTag: 'CN',
    state: 'RUNNING',
    currentTask: 'e2e regression pack',
    currentAction: 'reading e2e/checkout.spec.ts',
    model: 'Fable 5',
    speechBubble: 'running playwright pack',
    roomIndex: 2,
    tokens: 31200,
    cost: 0.46,
    executionTime: '04:10',
    files: ['e2e/checkout.spec.ts', 'tests/auth.test.ts', 'playwright.config.ts'],
    skills: ['Playwright', 'Vitest', 'DOM Assertions'],
    isPaused: false,
    accessory: 'glasses',
    pet: 'rubber-duck',
    level: 7,
    xp: 490,
  },
  rio: {
    id: 'rio',
    name: 'Melis',
    role: 'Product Designer',
    team: 'PRODUCT',
    department: 'Design Studio',
    color: '#F59E0B',
    avatarTag: 'ML',
    state: 'WORKING',
    currentTask: 'order-confirm workflow v2',
    currentAction: 'crafting hero component',
    model: 'Claude 3.5 Sonnet',
    speechBubble: 'polishing UI micro-interactions',
    roomIndex: 2,
    tokens: 18400,
    cost: 0.27,
    executionTime: '02:15',
    files: ['components/ConfirmModal.tsx', 'components/LandingHero.tsx'],
    skills: ['UI/UX Systems', 'Micro-Animations', 'Tailwind Tokens'],
    isPaused: false,
    accessory: 'beret',
    pet: 'cyber-cat',
    level: 8,
    xp: 630,
  },
  lux: {
    id: 'lux',
    name: 'Burak',
    role: 'Growth Marketing',
    team: 'MARKETING',
    department: 'Marketing & Ops Room',
    color: '#EC4899',
    avatarTag: 'BK',
    state: 'IDLE',
    currentTask: 'SEO Optimization',
    currentAction: 'keyword cluster analysis',
    model: 'GPT-4o',
    speechBubble: 'analyzing campaign CTR',
    roomIndex: 3,
    tokens: 12500,
    cost: 0.18,
    executionTime: '01:20',
    files: ['src/analytics/events.ts', 'public/sitemap.xml'],
    skills: ['SEO Clusters', 'Telemetry Analytics', 'Copywriting'],
    isPaused: false,
    accessory: 'party-hat',
    pet: 'mini-drone',
    level: 6,
    xp: 320,
  },
  sol: {
    id: 'sol',
    name: 'Mert',
    role: 'DevOps & Infra',
    team: 'PRODUCT',
    department: 'DevOps & Cloud Matrix',
    color: '#EAB308',
    avatarTag: 'MR',
    state: 'SPEAKING',
    currentTask: 'Task Dispatcher',
    currentAction: 'assigning webhook retry fix',
    model: 'Gemini 1.5 Pro',
    speechBubble: 'routing tasks to crew',
    roomIndex: 3,
    tokens: 16800,
    cost: 0.21,
    executionTime: '03:05',
    files: ['Dockerfile', 'docker-compose.yml', 'k8s/deployment.yaml'],
    skills: ['Kubernetes', 'CI/CD Pipelines', 'Edge Routing'],
    isPaused: false,
    accessory: 'headphones',
    pet: 'pixel-dog',
    level: 8,
    xp: 750,
  },
  max: {
    id: 'max',
    name: 'Arda',
    role: 'Security Engineer',
    team: 'SUPPORT',
    department: 'Security & QA Room',
    color: '#EF4444',
    avatarTag: 'AR',
    state: 'WORKING',
    currentTask: 'Vulnerability Scan',
    currentAction: 'testing edge handlers',
    model: 'DeepSeek V3',
    speechBubble: 'verifying OWASP standards',
    roomIndex: 1,
    tokens: 22100,
    cost: 0.11,
    executionTime: '02:50',
    files: ['security/owasp-audit.json', 'src/middleware/authGuard.ts'],
    skills: ['OWASP Top 10', 'Penetration Testing', 'JWT Secrets'],
    isPaused: false,
    accessory: 'visor',
    pet: 'mini-drone',
    level: 7,
    xp: 450,
  },
  vesper: {
    id: 'vesper',
    name: 'Defne',
    role: 'Quantum & AI Researcher',
    team: 'PRODUCT',
    department: 'AI Research & Neural Lab',
    color: '#8B5CF6',
    avatarTag: 'DF',
    state: 'FOCUS',
    currentTask: 'Self-Improving Reasoning Engine',
    currentAction: 'fine-tuning transformer attention matrices',
    model: 'Claude 3.7 Sonnet',
    speechBubble: 'evaluating multi-token loss',
    roomIndex: 4,
    tokens: 68400,
    cost: 0.95,
    executionTime: '06:40',
    files: ['src/ai/reasoning.ts', 'models/hyperparameters.json', 'research/paper_eval.md'],
    skills: ['Deep RL', 'Vector Indexing', 'Attention Pruning', 'PyTorch'],
    isPaused: false,
    accessory: 'visor',
    pet: 'cyber-cat',
    deskItem: 'quantum-cube',
    level: 9,
    xp: 890,
  },
  atlas: {
    id: 'atlas',
    name: 'Ege',
    role: 'Lead Mobile Architect',
    team: 'PRODUCT',
    department: 'Mobile & Cross-Platform Studio',
    color: '#F97316',
    avatarTag: 'EG',
    state: 'WORKING',
    currentTask: 'iOS & Android Native Bridge',
    currentAction: 'compiling Flutter webassembly target',
    model: 'gpt-5-codex',
    speechBubble: 'optimizing frame rendering 60fps',
    roomIndex: 5,
    tokens: 44100,
    cost: 0.52,
    executionTime: '04:15',
    files: ['mobile/lib/main.dart', 'mobile/ios/Runner/AppDelegate.swift', 'mobile/android/app/build.gradle'],
    skills: ['Flutter / Dart', 'SwiftUI', 'Kotlin Multiplatform', 'Wasm Engine'],
    isPaused: false,
    accessory: 'headphones',
    pet: 'pixel-dog',
    deskItem: 'dual-monitors',
    level: 8,
    xp: 620,
  },
  nyx: {
    id: 'nyx',
    name: 'Berk',
    role: 'Red Team Ethical Hacker',
    team: 'SUPPORT',
    department: 'Red Team Cyber Matrix',
    color: '#10B981',
    avatarTag: 'BR',
    state: 'ALERT',
    currentTask: 'Automated Fuzzing & Exploit Defense',
    currentAction: 'simulating memory corruption edge cases',
    model: 'DeepSeek V3',
    speechBubble: 'zero vulnerabilities found in gateway',
    roomIndex: 6,
    tokens: 51200,
    cost: 0.38,
    executionTime: '05:30',
    files: ['security/fuzzer.rs', 'security/cve_signatures.yaml', 'src/crypto/vault.ts'],
    skills: ['Zero-day Research', 'Reverse Engineering', 'Rust Memory Safety', 'Cryptanalysis'],
    isPaused: false,
    accessory: 'hacker-mask',
    pet: 'rubber-duck',
    deskItem: 'energy-drink',
    level: 9,
    xp: 940,
  },
  echo: {
    id: 'echo',
    name: 'Zeynep',
    role: 'Data Science & MLOps',
    team: 'PRODUCT',
    department: 'Data Science & ML Vault',
    color: '#06B6D4',
    avatarTag: 'ZY',
    state: 'RUNNING',
    currentTask: 'Distributed Vector Pipeline',
    currentAction: 'indexing 1.2M embeddings in Milvus',
    model: 'Gemini 1.5 Pro',
    speechBubble: 'latency down to 1.8ms per query',
    roomIndex: 7,
    tokens: 39500,
    cost: 0.42,
    executionTime: '03:50',
    files: ['pipelines/vector_etl.py', 'mlops/triton_config.pbtxt', 'data/embeddings_cache.bin'],
    skills: ['Vector Databases', 'CUDA / TensorRT', 'DuckDB', 'ETL Pipelines'],
    isPaused: false,
    accessory: 'glasses',
    pet: 'mini-drone',
    deskItem: 'plant',
    level: 8,
    xp: 710,
  },
  zoe: {
    id: 'zoe',
    name: 'Derya',
    role: 'UX Designer & Motion Artist',
    team: 'MARKETING',
    department: 'UX Creative Lounge & Arcade',
    color: '#F43F5E',
    avatarTag: 'DR',
    state: 'CELEBRATING',
    currentTask: 'Interactive 3D Motion Assets',
    currentAction: 'rendering shader glassmorphism materials',
    model: 'Claude 3.5 Sonnet',
    speechBubble: 'palette locked & accessible! ✨',
    roomIndex: 8,
    tokens: 28900,
    cost: 0.35,
    executionTime: '03:10',
    files: ['src/design/tokens.json', 'src/shaders/liquid.glsl', 'assets/icons/pixel_pack.svg'],
    skills: ['Design Systems', 'WebGL / Shaders', 'Figma Tokens', 'Micro-Interactions'],
    isPaused: false,
    accessory: 'beret',
    pet: 'cyber-cat',
    deskItem: 'coffee-mug',
    level: 8,
    xp: 590,
  },
  deniz: {
    id: 'deniz',
    name: 'Deniz',
    role: 'Cloud Architect & SRE',
    team: 'PRODUCT',
    department: 'Cloud Matrix & SRE Lab',
    color: '#38BDF8',
    avatarTag: 'DN',
    state: 'WORKING',
    currentTask: 'Multi-Region Kubernetes Failover',
    currentAction: 'configuring Istio service mesh traffic splitting',
    model: 'Gemini 1.5 Pro',
    speechBubble: '99.999% uptime target achieved',
    roomIndex: 9,
    tokens: 34200,
    cost: 0.39,
    executionTime: '03:40',
    files: ['infra/terraform/k8s_cluster.tf', 'k8s/istio_virtualservice.yaml'],
    skills: ['Kubernetes', 'Terraform', 'Istio Mesh', 'Prometheus / Grafana'],
    isPaused: false,
    accessory: 'headphones',
    pet: 'mini-drone',
    deskItem: 'dual-monitors',
    level: 8,
    xp: 740,
  },
  selin: {
    id: 'selin',
    name: 'Selin',
    role: 'QA Automation & Benchmark Lead',
    team: 'SUPPORT',
    department: 'Performance & QA Lab',
    color: '#A3E635',
    avatarTag: 'SL',
    state: 'TESTING',
    currentTask: 'High-Concurrency Load Testing',
    currentAction: 'running k6 load test with 10k virtual users',
    model: 'Claude 3.5 Sonnet',
    speechBubble: 'sub-20ms p99 latency verified! ⚡',
    roomIndex: 10,
    tokens: 36800,
    cost: 0.41,
    executionTime: '04:05',
    files: ['tests/load_test_k6.js', 'benchmark/latency_report.json'],
    skills: ['k6 Load Testing', 'Cypress', 'Playwright', 'Performance Profiling'],
    isPaused: false,
    accessory: 'glasses',
    pet: 'rubber-duck',
    deskItem: 'energy-drink',
    level: 8,
    xp: 670,
  },
};

export const initialTerminalPanes: TerminalPane[] = [
  {
    id: 'term-1',
    taskId: 'TASK-CH23757',
    agentId: 'nova',
    agentName: 'Nova',
    model: 'gpt-5-codex',
    taskTitle: 'webhook retry fix',
    currentFile: 'src/webhooks/retry.ts',
    status: 'running',
    lines: [
      '$ codex "pull your task from the board"',
      '▸ Codex · gpt-5-codex - Nova',
      '● webhook retry fix',
      'reading src/webhooks/retry.ts...',
      '✓ parsing exponential backoff algorithm',
      'reading src/webhooks/signature.ts...',
      '+ apply jitter (min: 200ms, max: 5000ms)',
      '+ export const retryWebhookWithBackoff = async () => {}',
    ],
  },
  {
    id: 'term-2',
    taskId: 'TASK-CH15038',
    agentId: 'emre',
    agentName: 'Emre',
    model: 'Fable 5',
    taskTitle: 'onboarding new UI',
    currentFile: 'app/onboarding/page.tsx',
    status: 'running',
    lines: [
      '$ claude "pull your task from the board"',
      '▸ Claude Code · Fable 5 - Emre',
      '● onboarding new UI',
      'reading app/onboarding/page.tsx...',
      '✓ verifying step wizard component hierarchy',
      'reading components/onboarding/ProgressBar.tsx...',
      '+ import { Stepper, Step } from "@/components/ui/stepper"',
      '+ rendering interactive workspace creation form',
    ],
  },
  {
    id: 'term-3',
    taskId: 'TASK-CH88491',
    agentId: 'kai',
    agentName: 'Kai - Frontend',
    model: 'Fable 5',
    taskTitle: 'e2e regression pack',
    currentFile: 'e2e/checkout.spec.ts',
    status: 'running',
    lines: [
      '$ claude "pull your task from the board"',
      '▸ Claude Code · Fable 5 - Kai',
      '● e2e regression pack',
      'reading e2e/checkout.spec.ts...',
      '+ await page.goto("/checkout")',
      '+ await page.fill("#card-number", "4242 4242 4242 4242")',
      '+ await page.click("#submit-order")',
      '✓ 14/14 checkout assertions passed (1.18s)',
    ],
  },
];

export const initialTasksList: TaskItem[] = [
  {
    id: 'TASK-CH31670',
    title: 'order-confirm workflow v2',
    description: 'Implement modal confirmation dialog with live stock check and stripe idempotency token.',
    priority: 'Normal',
    team: 'PRODUCT',
    assignedAgent: 'rio',
    status: 'IN_PROGRESS',
    progress: 68,
    tokensEst: 14200,
    costEst: 0.21,
    createdAt: '10m ago',
    subtasks: [
      { id: 'st-1', title: 'Design modal layout & atomic states', completed: true },
      { id: 'st-2', title: 'Connect useStripeConfirm hook', completed: true },
      { id: 'st-3', title: 'Vitest snapshot tests', completed: false },
    ],
  },
  {
    id: 'TASK-CH23757',
    title: 'webhook retry fix with exponential jitter',
    description: 'Fix race condition during payment webhook retry bursts by introducing randomized exponential jitter.',
    priority: 'High',
    team: 'PRODUCT',
    assignedAgent: 'nova',
    status: 'IN_PROGRESS',
    progress: 92,
    tokensEst: 24000,
    costEst: 0.15,
    createdAt: '25m ago',
    subtasks: [
      { id: 'st-4', title: 'Refactor retry backoff loop', completed: true },
      { id: 'st-5', title: 'Add HMAC signature validation check', completed: true },
    ],
  },
  {
    id: 'TASK-CH15038',
    title: 'onboarding new UI wizard & team invite',
    description: 'Build 4-step progressive onboarding wizard with workspace creation and instant team invite links.',
    priority: 'Normal',
    team: 'PRODUCT',
    assignedAgent: 'emre',
    status: 'IN_PROGRESS',
    progress: 74,
    tokensEst: 18500,
    costEst: 0.28,
    createdAt: '35m ago',
    subtasks: [
      { id: 'st-6', title: 'Stepper navigation component', completed: true },
      { id: 'st-7', title: 'Organization slug availability checker', completed: true },
      { id: 'st-8', title: 'Email invite batch sender', completed: false },
    ],
  },
  {
    id: 'TASK-CH88491',
    title: 'e2e regression pack for auth & payment',
    description: 'Run comprehensive Playwright browser test suite covering guest checkout and session tokens.',
    priority: 'Urgent',
    team: 'PRODUCT',
    assignedAgent: 'kai',
    status: 'DONE',
    progress: 100,
    tokensEst: 32000,
    costEst: 0.48,
    createdAt: '1h ago',
    subtasks: [
      { id: 'st-9', title: 'Auth redirect tests', completed: true },
      { id: 'st-10', title: 'Stripe 3DS flow mock tests', completed: true },
    ],
  },
  {
    id: 'TASK-CH99412',
    title: 'Landing page performance audit & caching',
    description: 'Optimize Next.js 15 server components and bundle sizes to achieve 99/100 Lighthouse score.',
    priority: 'Normal',
    team: 'PRODUCT',
    assignedAgent: 'ada',
    status: 'DONE',
    progress: 100,
    tokensEst: 11000,
    costEst: 0.16,
    createdAt: '2h ago',
    subtasks: [
      { id: 'st-11', title: 'Tree-shake lucide icons', completed: true },
      { id: 'st-12', title: 'Configure edge caching headers', completed: true },
    ],
  },
  {
    id: 'TASK-CH11048',
    title: 'Marketing campaign tracking parameter validation',
    description: 'Audit UTM query params and sync analytics events with PostHog endpoint.',
    priority: 'Low',
    team: 'MARKETING',
    assignedAgent: 'lux',
    status: 'TODO',
    progress: 0,
    tokensEst: 9500,
    costEst: 0.14,
    createdAt: '3h ago',
    subtasks: [
      { id: 'st-13', title: 'UTM regex validator middleware', completed: false },
    ],
  },
];

export const initialCodeFiles: CodeFile[] = [
  {
    id: 'file-1',
    path: 'src/webhooks/retry.ts',
    name: 'retry.ts',
    language: 'typescript',
    modifiedBy: 'nova',
    content: `import { createHmac } from 'crypto';

interface WebhookPayload {
  eventId: string;
  attempt: number;
  data: Record<string, any>;
}

export async function retryWebhookWithBackoff(
  payload: WebhookPayload,
  maxAttempts = 5
): Promise<{ success: boolean; latency: number }> {
  const start = Date.now();
  const baseDelay = 200; // ms
  const maxDelay = 5000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const jitter = Math.random() * 100;
    const delay = Math.min(maxDelay, baseDelay * Math.pow(2, attempt)) + jitter;

    try {
      await new Promise((res) => setTimeout(res, delay));
      return { success: true, latency: Date.now() - start };
    } catch (err) {
      if (attempt === maxAttempts) throw err;
    }
  }

  return { success: false, latency: Date.now() - start };
}`,
  },
  {
    id: 'file-2',
    path: 'app/onboarding/page.tsx',
    name: 'page.tsx',
    language: 'typescript',
    modifiedBy: 'emre',
    content: `import React, { useState } from 'react';
import { Stepper, Step } from '@/components/ui/stepper';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState('Shaz Vision HQ');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <Stepper activeStep={currentStep} totalSteps={4} />

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-mono">Create your AI Company</h1>
          <p className="text-sm text-slate-400">Configure your autonomous employee roster</p>
        </div>

        <input
          type="text"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-sm"
        />

        <button
          onClick={() => setCurrentStep((s) => s + 1)}
          className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold font-mono"
        >
          Continue to Agent Provisioning →
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'file-3',
    path: 'e2e/checkout.spec.ts',
    name: 'checkout.spec.ts',
    language: 'typescript',
    modifiedBy: 'kai',
    content: `import { test, expect } from '@playwright/test';

test.describe('Order Confirmation Flow v2', () => {
  test('should verify checkout idempotency and card tokenization', async ({ page }) => {
    await page.goto('/checkout');
    await page.fill('#card-number', '4242 4242 4242 4242');
    await page.fill('#card-exp', '12/28');
    await page.fill('#card-cvc', '123');
    await page.click('#submit-order');

    await expect(page.locator('#order-status')).toHaveText('Confirmed');
    await expect(page.locator('.receipt-id')).toBeVisible();
  });
});`,
  },
];

export const initialBrowserPages: BrowserPage[] = [
  {
    url: 'https://preview.shazvision.local/onboarding',
    title: 'Shaz Vision AI Workspace — Onboarding Preview',
    status: '200 OK',
    domHtml: `
      <div style="padding: 24px; font-family: monospace; color: #fff; background: #0A0C13; border-radius: 8px; text-align: center;">
        <h2 style="color: #A855F7; margin-bottom: 8px;">🚀 Shaz Vision AI Workspace</h2>
        <p style="color: #94A3B8; font-size: 13px;">Welcome, Supervisor Berkay Şahin. 8 Agents Active.</p>
        <div style="margin-top: 16px; display: inline-block; padding: 8px 16px; background: #1E293B; border-radius: 6px; border: 1px solid #334155;">
          <span style="color: #10B981; font-weight: bold;">● System Ready</span> · Next.js 15 SSR
        </div>
      </div>
    `,
    consoleLogs: [
      '[HMR] connected to ws://preview.shazvision.local:3000',
      '[Route] /onboarding rendered in 42ms',
      '[Auth] Session verified for supervisor@shazvision.ai',
    ],
  },
];

export const initialMcpServers: McpServer[] = [
  {
    id: 'mcp-github',
    name: 'GitHub Protocol Server',
    status: 'Connected',
    tools: ['create_pr', 'push_commits', 'create_issue', 'get_file_contents', 'merge_branch'],
    latencyMs: 12,
  },
  {
    id: 'mcp-fs',
    name: 'Workspace Filesystem',
    status: 'Connected',
    tools: ['read_file', 'write_file', 'list_dir', 'grep_search', 'delete_file'],
    latencyMs: 3,
  },
  {
    id: 'mcp-browser',
    name: 'Headless Browser Runner',
    status: 'Running',
    tools: ['navigate_url', 'take_screenshot', 'click_element', 'extract_text'],
    latencyMs: 24,
  },
  {
    id: 'mcp-postgres',
    name: 'PostgreSQL Database Adapter',
    status: 'Connected',
    tools: ['run_query', 'inspect_schema', 'apply_migration'],
    latencyMs: 15,
  },
  {
    id: 'mcp-terminal',
    name: 'Sandbox Terminal CLI',
    status: 'Running',
    tools: ['exec_command', 'stream_process', 'kill_process'],
    latencyMs: 2,
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pull Request Ready for Review',
    message: 'Nova completed TASK-CH23757 (webhook retry fix). Vitest suite passed 14/14.',
    timestamp: '2m ago',
    type: 'pr',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'E2E Regression Passed',
    message: 'Kai executed Playwright checkout regression pack with 0 errors.',
    timestamp: '8m ago',
    type: 'success',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Security Scan Completed',
    message: 'Max verified OWASP Top 10 compliance for JWT rotation handlers.',
    timestamp: '15m ago',
    type: 'info',
    read: false,
  },
];

export const initialReports: ReportItem[] = [
  {
    id: 'rep-1',
    title: 'Product Sprint 2.38 Regression Audit',
    date: '14.08.2025 · 15:40',
    coverage: '98.4%',
    testsPassed: 42,
    testsTotal: 42,
    agentSummary: 'All 8 agents completed work with zero critical regressions.',
    status: 'PASSED',
  },
  {
    id: 'rep-2',
    title: 'Webhook Signature Security Verification',
    date: '14.08.2025 · 14:15',
    coverage: '100%',
    testsPassed: 18,
    testsTotal: 18,
    agentSummary: 'HMAC SHA-256 validation verified against OWASP standard.',
    status: 'PASSED',
  },
];

export const initialVoiceState: GlobalVoiceState = {
  isSpeaking: true,
  speakingAgentName: 'AGENT X',
  lastAction: 'pane opened -> Rio - landing hero',
  transcript: 'refresh the landing page, spread it across the crew',
};
