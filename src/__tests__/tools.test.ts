import { describe, it, expect, vi, beforeAll } from 'vitest'

// The tools.ts module uses createRequire() for lazy imports (SendMessageTool,
// TeamCreateTool, TeamDeleteTool). These use Node's CJS require which bypasses
// vitest's transform pipeline, failing to find .js files (only .ts exists).
// We mock the 'module' builtin so createRequire returns a require function
// that returns stubs for these tools.
vi.mock('module', async (importOriginal) => {
  const actual = await importOriginal<typeof import('module')>()
  return {
    ...actual,
    createRequire: (url: string) => {
      const realRequire = actual.createRequire(url)
      return (id: string) => {
        // Stub lazy-loaded tools that only exist as .ts files
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

import { getAllBaseTools, parseToolPreset } from '../tools.js'

describe('tools', () => {
  describe('getAllBaseTools()', () => {
    it('returns an array', () => {
      const tools = getAllBaseTools()
      expect(Array.isArray(tools)).toBe(true)
    })

    it('returns a non-empty array', () => {
      const tools = getAllBaseTools()
      expect(tools.length).toBeGreaterThan(0)
    })

    it('every tool has a name property that is a string', () => {
      const tools = getAllBaseTools()
      for (const tool of tools) {
        expect(typeof tool.name).toBe('string')
        expect(tool.name.length).toBeGreaterThan(0)
      }
    })

    it('tool names are unique (no duplicates)', () => {
      const tools = getAllBaseTools()
      const names = tools.map(t => t.name)
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(names.length)
    })

    it('contains known core tools', () => {
      const tools = getAllBaseTools()
      const names = new Set(tools.map(t => t.name))

      // These core tools should always be present
      expect(names.has('Bash')).toBe(true)
      expect(names.has('Read')).toBe(true)
      expect(names.has('Edit')).toBe(true)
      expect(names.has('Write')).toBe(true)
      expect(names.has('WebFetch')).toBe(true)
      expect(names.has('WebSearch')).toBe(true)
    })

    it('contains Glob and Grep tools (non-embedded environment)', () => {
      // In standard Node.js (non-ant builds), Glob and Grep should be present
      const tools = getAllBaseTools()
      const names = new Set(tools.map(t => t.name))

      expect(names.has('Glob')).toBe(true)
      expect(names.has('Grep')).toBe(true)
    })
  })

  describe('parseToolPreset()', () => {
    it('returns "default" for "default" input', () => {
      expect(parseToolPreset('default')).toBe('default')
    })

    it('is case-insensitive', () => {
      expect(parseToolPreset('DEFAULT')).toBe('default')
      expect(parseToolPreset('Default')).toBe('default')
    })

    it('returns null for invalid preset names', () => {
      expect(parseToolPreset('invalid')).toBeNull()
      expect(parseToolPreset('foobar')).toBeNull()
      expect(parseToolPreset('')).toBeNull()
    })
  })
})
