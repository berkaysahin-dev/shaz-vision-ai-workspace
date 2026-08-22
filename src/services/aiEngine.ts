import { AgentId } from '../types';

export type AIProviderId = 'ollama' | 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'groq' | 'simulated';

export interface AISettings {
  activeProvider: AIProviderId;
  ollamaEndpoint: string;
  ollamaModel: string;
  openaiKey: string;
  openaiModel: string;
  anthropicKey: string;
  anthropicModel: string;
  geminiKey: string;
  geminiModel: string;
  deepseekKey: string;
  deepseekModel: string;
  groqKey: string;
  groqModel: string;
}

const DEFAULT_SETTINGS: AISettings = {
  activeProvider: 'simulated',
  ollamaEndpoint: 'http://localhost:11434',
  ollamaModel: 'llama3:latest',
  openaiKey: '',
  openaiModel: 'gpt-4o',
  anthropicKey: '',
  anthropicModel: 'claude-3-5-sonnet-20241022',
  geminiKey: '',
  geminiModel: 'gemini-1.5-pro',
  deepseekKey: '',
  deepseekModel: 'deepseek-coder',
  groqKey: '',
  groqModel: 'llama-3.3-70b-versatile',
};

export interface AgentPromptContext {
  taskTitle?: string;
  currentFile?: string;
  activeTeam?: string;
  recentLogs?: string[];
  systemPrompt?: string;
}

export interface AIExecutionResult {
  content: string;
  tokensUsed: number;
  cost: number;
  model: string;
  provider: AIProviderId;
  suggestedCommands?: string[];
  suggestedFiles?: { path: string; content: string }[];
}

export interface OrchestrationStep {
  agentId: AgentId;
  agentName: string;
  actionDescription: string;
  suggestedCommand?: string;
  fileToEdit?: string;
  speech: string;
}

export interface OrchestrationPlan {
  summary: string;
  leadThought: string;
  steps: OrchestrationStep[];
}

class AIEngineService {
  private settings: AISettings = { ...DEFAULT_SETTINGS };

  constructor() {
    this.loadSettings();
  }

  public getSettings(): AISettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<AISettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  private loadSettings() {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('shaz_ai_settings_v1');
      if (saved) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load AI settings from localStorage', e);
    }
  }

  private saveSettings() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('shaz_ai_settings_v1', JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Failed to save AI settings to localStorage', e);
    }
  }

  /**
   * Fetch available models from local Ollama instance
   */
  public async testOllamaConnection(endpoint = this.settings.ollamaEndpoint): Promise<{ success: boolean; models: string[]; error?: string }> {
    try {
      const cleanEndpoint = endpoint.replace(/\/$/, '');
      const res = await fetch(`${cleanEndpoint}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        return { success: false, models: [], error: `HTTP ${res.status}: ${res.statusText}` };
      }

      const data = await res.json();
      const models = (data.models || []).map((m: any) => m.name || m.model);
      return { success: true, models };
    } catch (err: any) {
      return { success: false, models: [], error: err.message || 'Connection refused. Is Ollama running on localhost:11434?' };
    }
  }

  /**
   * Execute real prompt with active LLM Provider
   */
  public async generateCompletion(
    prompt: string,
    context?: AgentPromptContext,
    onStreamChunk?: (chunk: string) => void
  ): Promise<AIExecutionResult> {
    const provider = this.settings.activeProvider;

    switch (provider) {
      case 'ollama':
        return this.executeOllama(prompt, context, onStreamChunk);
      case 'openai':
        return this.executeOpenAI(prompt, context);
      case 'anthropic':
        return this.executeAnthropic(prompt, context);
      case 'gemini':
        return this.executeGemini(prompt, context);
      case 'deepseek':
        return this.executeDeepSeek(prompt, context);
      case 'groq':
        return this.executeGroq(prompt, context);
      case 'simulated':
      default:
        return this.executeSimulated(prompt, context, onStreamChunk);
    }
  }

  /**
   * Real Ollama API Client
   */
  private async executeOllama(
    prompt: string,
    context?: AgentPromptContext,
    onStreamChunk?: (chunk: string) => void
  ): Promise<AIExecutionResult> {
    const endpoint = this.settings.ollamaEndpoint.replace(/\/$/, '');
    const model = this.settings.ollamaModel || 'llama3:latest';

    try {
      const sys = context?.systemPrompt || 'You are an autonomous AI software developer working inside Shaz Vision AI Workspace.';
      const res = await fetch(`${endpoint}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt: `${sys}\n\nUser Request: ${prompt}`,
          stream: Boolean(onStreamChunk),
        }),
      });

      if (!res.ok) {
        throw new Error(`Ollama error ${res.status}: ${res.statusText}`);
      }

      if (onStreamChunk && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunkStr = decoder.decode(value, { stream: true });
          const lines = chunkStr.split('\n').filter(Boolean);
          for (const line of lines) {
            try {
              const parsed = JSON.parse(line);
              if (parsed.response) {
                fullText += parsed.response;
                onStreamChunk(parsed.response);
              }
            } catch (e) {}
          }
        }

        return {
          content: fullText,
          tokensUsed: Math.round(fullText.length / 4),
          cost: 0.00,
          model,
          provider: 'ollama',
        };
      }

      const data = await res.json();
      return {
        content: data.response || '',
        tokensUsed: data.eval_count || Math.round((data.response || '').length / 4),
        cost: 0.00,
        model,
        provider: 'ollama',
      };
    } catch (err: any) {
      console.warn('Ollama execution failed, falling back to simulated:', err);
      const sim = await this.executeSimulated(prompt, context, onStreamChunk);
      sim.content = `[Ollama Error: ${err.message} - Falling back to local offline engine]\n\n${sim.content}`;
      return sim;
    }
  }

  /**
   * OpenAI API Client
   */
  private async executeOpenAI(prompt: string, context?: AgentPromptContext): Promise<AIExecutionResult> {
    if (!this.settings.openaiKey) {
      return this.executeSimulated(prompt, context);
    }

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.settings.openaiKey}`,
        },
        body: JSON.stringify({
          model: this.settings.openaiModel || 'gpt-4o',
          messages: [
            { role: 'system', content: context?.systemPrompt || 'You are an autonomous AI engineer in Shaz Vision AI Workspace.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || '';
      return {
        content: reply,
        tokensUsed: data.usage?.total_tokens || Math.round(reply.length / 4),
        cost: (data.usage?.total_tokens || 1000) * 0.000005,
        model: this.settings.openaiModel,
        provider: 'openai',
      };
    } catch (e: any) {
      return this.executeSimulated(prompt, context);
    }
  }

  /**
   * Anthropic Claude API Client
   */
  private async executeAnthropic(prompt: string, context?: AgentPromptContext): Promise<AIExecutionResult> {
    if (!this.settings.anthropicKey) {
      return this.executeSimulated(prompt, context);
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.settings.anthropicKey,
          'anthropic-version': '2023-06-01',
          'dangerously-allow-browser': 'true',
        },
        body: JSON.stringify({
          model: this.settings.anthropicModel || 'claude-3-5-sonnet-20241022',
          max_tokens: 2048,
          system: context?.systemPrompt || 'You are an autonomous AI engineer in Shaz Vision AI Workspace.',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      return {
        content: text,
        tokensUsed: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
        cost: 0.003,
        model: this.settings.anthropicModel,
        provider: 'anthropic',
      };
    } catch (e) {
      return this.executeSimulated(prompt, context);
    }
  }

  /**
   * Google Gemini API Client
   */
  private async executeGemini(prompt: string, context?: AgentPromptContext): Promise<AIExecutionResult> {
    if (!this.settings.geminiKey) {
      return this.executeSimulated(prompt, context);
    }

    try {
      const model = this.settings.geminiModel || 'gemini-1.5-pro';
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.settings.geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${context?.systemPrompt || ''}\n\n${prompt}` }] }],
          }),
        }
      );

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return {
        content: reply,
        tokensUsed: Math.round(reply.length / 4),
        cost: 0.0005,
        model,
        provider: 'gemini',
      };
    } catch (e) {
      return this.executeSimulated(prompt, context);
    }
  }

  /**
   * DeepSeek API Client
   */
  private async executeDeepSeek(prompt: string, context?: AgentPromptContext): Promise<AIExecutionResult> {
    if (!this.settings.deepseekKey) {
      return this.executeSimulated(prompt, context);
    }

    try {
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.settings.deepseekKey}`,
        },
        body: JSON.stringify({
          model: this.settings.deepseekModel || 'deepseek-coder',
          messages: [
            { role: 'system', content: context?.systemPrompt || 'You are an autonomous AI coder.' },
            { role: 'user', content: prompt },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || '';
      return {
        content: reply,
        tokensUsed: data.usage?.total_tokens || Math.round(reply.length / 4),
        cost: 0.0002,
        model: this.settings.deepseekModel,
        provider: 'deepseek',
      };
    } catch (e) {
      return this.executeSimulated(prompt, context);
    }
  }

  /**
   * Groq Fast Inference API Client
   */
  private async executeGroq(prompt: string, context?: AgentPromptContext): Promise<AIExecutionResult> {
    if (!this.settings.groqKey) {
      return this.executeSimulated(prompt, context);
    }

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.settings.groqKey}`,
        },
        body: JSON.stringify({
          model: this.settings.groqModel || 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: context?.systemPrompt || 'You are an autonomous AI software developer.' },
            { role: 'user', content: prompt },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || '';
      return {
        content: reply,
        tokensUsed: data.usage?.total_tokens || Math.round(reply.length / 4),
        cost: 0.0001,
        model: this.settings.groqModel,
        provider: 'groq',
      };
    } catch (e) {
      return this.executeSimulated(prompt, context);
    }
  }

  /**
   * Simulated Offline Engine (Instant, dynamic, and realistic fallback)
   */
  private async executeSimulated(
    prompt: string,
    context?: AgentPromptContext,
    onStreamChunk?: (chunk: string) => void
  ): Promise<AIExecutionResult> {
    const clean = prompt.trim().toLowerCase();

    let output = '';
    let commands: string[] = [];

    if (clean.includes('test') || clean.includes('e2e') || clean.includes('qa')) {
      output = `✓ Running test suite across 14 modules...\n✓ Vitest unit tests: 18/18 passed in 1.12s\n✓ Playwright E2E pack: checkout.spec.ts, auth.spec.ts passed with 0 flakiness.\n\nSummary: All regression assertions are green.`;
      commands = ['npm run test', 'npx playwright test'];
    } else if (clean.includes('build') || clean.includes('derle') || clean.includes('compile')) {
      output = `✓ Compiling production assets with Vite & TypeScript...\n✓ 1649 modules transformed.\n✓ Output bundles generated in dist/ (gzip: 112 kB).\n✓ Zero typecheck errors detected.`;
      commands = ['npm run build', 'npx tsc --noEmit'];
    } else if (clean.includes('security') || clean.includes('owasp') || clean.includes('scan') || clean.includes('güvenlik')) {
      output = `🛡️ Red Team Security Scan Summary:\n- OWASP Top 10 compliance: PASS\n- JWT Token Expiry & Refresh Jitter: VERIFIED\n- SQL/Command Injection Vector Simulation: 0 exploits found\n- Dependencies audit: Clean`;
      commands = ['npm audit', 'npx snyk test'];
    } else if (clean.includes('login') || clean.includes('auth') || clean.includes('giriş')) {
      output = `🔑 Auth Workflow Updates:\n- Refactored login page credentials validation.\n- Added smooth shake animation on invalid credentials.\n- Connected OAuth2 Google/GitHub callbacks with secure HTTP-only cookies.`;
      commands = ['git status', 'npm run test'];
    } else {
      output = `🚀 Autonomous Task Execution Plan:\n1. Architecture review completed by Ada.\n2. Backend endpoints synchronized by Kaan.\n3. Frontend components styled by Emre & Can.\n4. Verification tests queued on Selin's terminal.\n\nResult: Ready to deploy and ship.`;
      commands = ['git status', 'npm run build'];
    }

    if (onStreamChunk) {
      const words = output.split(' ');
      for (const word of words) {
        onStreamChunk(word + ' ');
        await new Promise((r) => setTimeout(r, 20));
      }
    }

    return {
      content: output,
      tokensUsed: Math.round(output.length / 4),
      cost: 0.001,
      model: 'Simulated Engine (Offline)',
      provider: 'simulated',
      suggestedCommands: commands,
    };
  }

  /**
   * Orchestrate a global user prompt across the AI crew
   */
  public async orchestratePrompt(prompt: string): Promise<OrchestrationPlan> {
    const clean = prompt.toLowerCase();

    const plan: OrchestrationPlan = {
      summary: `Dispatching task: "${prompt}"`,
      leadThought: `Ada is analyzing requirements and assigning roles to the crew.`,
      steps: [
        {
          agentId: 'ada',
          agentName: 'Ada',
          actionDescription: 'Architectural schema review & task partitioning',
          speech: "I've structured the implementation spec and divided subtasks.",
          suggestedCommand: 'git status',
        },
        {
          agentId: 'nova',
          agentName: 'Kaan',
          actionDescription: 'API endpoints & backend logic implementation',
          speech: 'Writing handlers and validating request validation schemas.',
          suggestedCommand: 'npm run test',
        },
        {
          agentId: 'kai',
          agentName: 'Can',
          actionDescription: 'UI integration & reactive state updates',
          speech: 'Connecting components and styling responsive layout tokens.',
          suggestedCommand: 'npm run build',
        },
        {
          agentId: 'selin',
          agentName: 'Selin',
          actionDescription: 'End-to-end regression testing and benchmark checks',
          speech: 'Running Playwright and k6 load verification.',
          suggestedCommand: 'npm run test',
        },
      ],
    };

    if (clean.includes('güvenlik') || clean.includes('security') || clean.includes('scan')) {
      plan.steps.push({
        agentId: 'nyx',
        agentName: 'Berk',
        actionDescription: 'Red team fuzzing & vulnerability assessment',
        speech: 'Simulating OWASP attack vectors and checking memory safety.',
        suggestedCommand: 'npm audit',
      });
    }

    return plan;
  }
}

export const aiEngine = new AIEngineService();
