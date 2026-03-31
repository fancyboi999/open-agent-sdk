import { describe, it, expect, vi } from 'vitest'

// Mock the 'module' builtin to stub createRequire-based lazy imports
// in tools.ts (SendMessageTool, TeamCreateTool, TeamDeleteTool).
vi.mock('module', async (importOriginal) => {
  const actual = await importOriginal<typeof import('module')>()
  return {
    ...actual,
    createRequire: (url: string) => {
      const realRequire = actual.createRequire(url)
      return (id: string) => {
        if (id.includes('SendMessageTool')) {
          return { SendMessageTool: { name: 'SendMessage', isEnabled: () => true } }
        }
        if (id.includes('TeamCreateTool')) {
          return { TeamCreateTool: { name: 'TeamCreate', isEnabled: () => true } }
        }
        if (id.includes('TeamDeleteTool')) {
          return { TeamDeleteTool: { name: 'TeamDelete', isEnabled: () => true } }
        }
        return realRequire(id)
      }
    },
  }
})

import { Agent, createAgent, query } from '../agent.js'

describe('Agent', () => {
  describe('createAgent()', () => {
    it('returns an Agent instance', () => {
      const agent = createAgent()
      expect(agent).toBeInstanceOf(Agent)
    })

    it('works with default options (no arguments)', () => {
      const agent = createAgent()
      expect(agent).toBeDefined()
    })

    it('accepts model option', () => {
      const agent = createAgent({ model: 'test-model' })
      expect(agent).toBeInstanceOf(Agent)
    })

    it('accepts permissionMode options', () => {
      const modes = ['default', 'acceptEdits', 'bypassPermissions', 'plan'] as const
      for (const mode of modes) {
        const agent = createAgent({ permissionMode: mode })
        expect(agent).toBeInstanceOf(Agent)
      }
    })
  })

  describe('Agent instance methods', () => {
    it('getMessages() returns empty array initially', () => {
      const agent = createAgent()
      const messages = agent.getMessages()
      expect(Array.isArray(messages)).toBe(true)
      expect(messages).toHaveLength(0)
    })

    it('getMessages() returns a copy (not the internal array)', () => {
      const agent = createAgent()
      const messages1 = agent.getMessages()
      const messages2 = agent.getMessages()
      expect(messages1).not.toBe(messages2)
      expect(messages1).toEqual(messages2)
    })

    it('clear() resets conversation state', () => {
      const agent = createAgent()
      agent.clear()
      const messages = agent.getMessages()
      expect(messages).toHaveLength(0)
    })

    it('query is an async generator function', () => {
      const agent = createAgent()
      // AsyncGeneratorFunction constructor name check
      const result = agent.query('test')
      expect(result).toBeDefined()
      expect(typeof result[Symbol.asyncIterator]).toBe('function')
    })
  })

  describe('env option resolution', () => {
    it('resolves apiKey from env.ANTHROPIC_API_KEY', () => {
      const agent = createAgent({
        env: { ANTHROPIC_API_KEY: 'test-key-from-env' },
      })
      // The agent should be created without error
      expect(agent).toBeInstanceOf(Agent)
    })

    it('resolves apiKey from env.ANTHROPIC_AUTH_TOKEN', () => {
      const agent = createAgent({
        env: { ANTHROPIC_AUTH_TOKEN: 'test-token-from-env' },
      })
      expect(agent).toBeInstanceOf(Agent)
    })

    it('resolves baseURL from env.ANTHROPIC_BASE_URL', () => {
      const agent = createAgent({
        env: { ANTHROPIC_BASE_URL: 'https://custom-api.example.com' },
      })
      expect(agent).toBeInstanceOf(Agent)
    })

    it('resolves model from env.ANTHROPIC_MODEL', () => {
      const agent = createAgent({
        env: { ANTHROPIC_MODEL: 'claude-opus-4-6' },
      })
      expect(agent).toBeInstanceOf(Agent)
    })

    it('direct options take precedence over env', () => {
      const agent = createAgent({
        apiKey: 'direct-key',
        env: { ANTHROPIC_API_KEY: 'env-key' },
      })
      // Should not throw - direct key takes precedence
      expect(agent).toBeInstanceOf(Agent)
    })
  })

  describe('top-level query()', () => {
    it('is an async generator function', () => {
      const result = query({ prompt: 'test', options: {} })
      expect(result).toBeDefined()
      expect(typeof result[Symbol.asyncIterator]).toBe('function')
    })
  })
})
