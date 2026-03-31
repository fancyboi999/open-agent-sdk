import { defineConfig } from 'vitest/config'
import path from 'path'

const stubPath = path.resolve('./src/__tests__/__mocks__/stub.ts')
const sandboxMockPath = path.resolve('./src/__tests__/__mocks__/sandbox-runtime.ts')

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      // Stub missing optional/internal dependencies so the import chain
      // doesn't break during tests. These packages are not shipped with
      // the open-source distribution.
      '@anthropic-ai/sandbox-runtime': sandboxMockPath,
      'color-diff-napi': stubPath,
      '@alcalzone/ansi-tokenize': stubPath,
      '@ant/claude-for-chrome-mcp': stubPath,
      '@ant/computer-use-input': stubPath,
      '@ant/computer-use-mcp': stubPath,
      '@ant/computer-use-swift': stubPath,
      '@anthropic-ai/claude-agent-sdk': stubPath,
      '@anthropic-ai/mcpb': stubPath,
      '@aws-sdk/client-bedrock-runtime': stubPath,
      'qrcode': stubPath,
    },
  },
})
