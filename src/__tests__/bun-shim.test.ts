import { describe, it, expect } from 'vitest'
import { feature, embed, MACRO } from '../bun-shim.js'

describe('bun-shim', () => {
  describe('feature()', () => {
    it('returns false for any feature name', () => {
      expect(feature('SOME_FEATURE')).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(feature('')).toBe(false)
    })

    it('returns false for multiple different feature names', () => {
      const features = ['PROACTIVE', 'KAIROS', 'COORDINATOR_MODE', 'OVERFLOW_TEST_TOOL']
      for (const name of features) {
        expect(feature(name)).toBe(false)
      }
    })
  })

  describe('embed()', () => {
    it('returns null for any path', () => {
      expect(embed('/some/path')).toBeNull()
    })

    it('returns null for empty string', () => {
      expect(embed('')).toBeNull()
    })
  })

  describe('MACRO', () => {
    it('has VERSION property as a string', () => {
      expect(typeof MACRO.VERSION).toBe('string')
      expect(MACRO.VERSION.length).toBeGreaterThan(0)
    })

    it('has expected keys', () => {
      expect(MACRO).toHaveProperty('VERSION')
      expect(MACRO).toHaveProperty('BUILD_TIME')
      expect(MACRO).toHaveProperty('COMMIT_HASH')
      expect(MACRO).toHaveProperty('VERSION_CHANGELOG')
      expect(MACRO).toHaveProperty('ISSUES_EXPLAINER')
    })

    it('BUILD_TIME is a valid ISO date string', () => {
      const parsed = Date.parse(MACRO.BUILD_TIME)
      expect(Number.isNaN(parsed)).toBe(false)
    })

    it('COMMIT_HASH is a string', () => {
      expect(typeof MACRO.COMMIT_HASH).toBe('string')
    })

    it('ISSUES_EXPLAINER contains a URL', () => {
      expect(MACRO.ISSUES_EXPLAINER).toContain('https://')
    })
  })
})
