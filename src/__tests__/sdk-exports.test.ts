import { describe, it, expect } from 'vitest'
import * as sdk from '../sdk.js'

describe('SDK public exports', () => {
  describe('Agent API', () => {
    it('exports Agent class', () => {
      expect(sdk.Agent).toBeDefined()
      expect(typeof sdk.Agent).toBe('function')
    })

    it('exports createAgent factory function', () => {
      expect(sdk.createAgent).toBeDefined()
      expect(typeof sdk.createAgent).toBe('function')
    })

    it('exports query function', () => {
      expect(sdk.query).toBeDefined()
      expect(typeof sdk.query).toBe('function')
    })
  })

  describe('Tool exports', () => {
    it('exports getAllBaseTools', () => {
      expect(sdk.getAllBaseTools).toBeDefined()
      expect(typeof sdk.getAllBaseTools).toBe('function')
    })

    it('exports getTools', () => {
      expect(sdk.getTools).toBeDefined()
      expect(typeof sdk.getTools).toBe('function')
    })

    it('exports assembleToolPool', () => {
      expect(sdk.assembleToolPool).toBeDefined()
      expect(typeof sdk.assembleToolPool).toBe('function')
    })

    it('exports filterToolsByDenyRules', () => {
      expect(sdk.filterToolsByDenyRules).toBeDefined()
      expect(typeof sdk.filterToolsByDenyRules).toBe('function')
    })
  })

  describe('Individual tool exports', () => {
    it('exports BashTool', () => {
      expect(sdk.BashTool).toBeDefined()
    })

    it('exports FileReadTool', () => {
      expect(sdk.FileReadTool).toBeDefined()
    })

    it('exports FileWriteTool', () => {
      expect(sdk.FileWriteTool).toBeDefined()
    })

    it('exports FileEditTool', () => {
      expect(sdk.FileEditTool).toBeDefined()
    })

    it('exports GlobTool', () => {
      expect(sdk.GlobTool).toBeDefined()
    })

    it('exports GrepTool', () => {
      expect(sdk.GrepTool).toBeDefined()
    })

    it('exports WebFetchTool', () => {
      expect(sdk.WebFetchTool).toBeDefined()
    })

    it('exports WebSearchTool', () => {
      expect(sdk.WebSearchTool).toBeDefined()
    })

    it('exports AgentTool', () => {
      expect(sdk.AgentTool).toBeDefined()
    })
  })

  describe('Utility exports', () => {
    it('exports createUserMessage', () => {
      expect(sdk.createUserMessage).toBeDefined()
      expect(typeof sdk.createUserMessage).toBe('function')
    })

    it('exports normalizeMessages', () => {
      expect(sdk.normalizeMessages).toBeDefined()
      expect(typeof sdk.normalizeMessages).toBe('function')
    })

    it('exports createAssistantMessage', () => {
      expect(sdk.createAssistantMessage).toBeDefined()
      expect(typeof sdk.createAssistantMessage).toBe('function')
    })
  })

  describe('Service exports', () => {
    it('exports getAnthropicClient', () => {
      expect(sdk.getAnthropicClient).toBeDefined()
      expect(typeof sdk.getAnthropicClient).toBe('function')
    })

    it('exports connectMCPServer', () => {
      expect(sdk.connectMCPServer).toBeDefined()
      expect(typeof sdk.connectMCPServer).toBe('function')
    })
  })

  describe('Context exports', () => {
    it('exports getSystemContext', () => {
      expect(sdk.getSystemContext).toBeDefined()
      expect(typeof sdk.getSystemContext).toBe('function')
    })

    it('exports getUserContext', () => {
      expect(sdk.getUserContext).toBeDefined()
      expect(typeof sdk.getUserContext).toBe('function')
    })
  })

  describe('History exports', () => {
    it('exports getHistory', () => {
      expect(sdk.getHistory).toBeDefined()
      expect(typeof sdk.getHistory).toBe('function')
    })

    it('exports addToHistory', () => {
      expect(sdk.addToHistory).toBeDefined()
      expect(typeof sdk.addToHistory).toBe('function')
    })
  })

  describe('QueryEngine export', () => {
    it('exports QueryEngine', () => {
      expect(sdk.QueryEngine).toBeDefined()
    })
  })
})
