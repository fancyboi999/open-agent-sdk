/**
 * Bun compatibility shim for Node.js runtime.
 *
 * In the original Claude Code, these are Bun build-time macros
 * (from `bun:bundle`) that get replaced at compile time.
 * In Node.js, we provide runtime equivalents.
 */

/** Known feature flag names used across the codebase. */
export type FeatureFlag =
  | 'ABLATION_BASELINE'
  | 'AGENT_MEMORY_SNAPSHOT'
  | 'AGENT_TRIGGERS'
  | 'AGENT_TRIGGERS_REMOTE'
  | 'ALLOW_TEST_VERSIONS'
  | 'ANTI_DISTILLATION_CC'
  | 'AUTO_THEME'
  | 'AWAY_SUMMARY'
  | 'BASH_CLASSIFIER'
  | 'BG_SESSIONS'
  | 'BREAK_CACHE_COMMAND'
  | 'BRIDGE_MODE'
  | 'BUDDY'
  | 'BUILDING_CLAUDE_APPS'
  | 'BUILTIN_EXPLORE_PLAN_AGENTS'
  | 'BYOC_ENVIRONMENT_RUNNER'
  | 'CACHED_MICROCOMPACT'
  | 'CCR_AUTO_CONNECT'
  | 'CCR_MIRROR'
  | 'CCR_REMOTE_SETUP'
  | 'CHICAGO_MCP'
  | 'COMMIT_ATTRIBUTION'
  | 'COMPACTION_REMINDERS'
  | 'CONNECTOR_TEXT'
  | 'CONTEXT_COLLAPSE'
  | 'COORDINATOR_MODE'
  | 'COWORKER_TYPE_TELEMETRY'
  | 'DAEMON'
  | 'DIRECT_CONNECT'
  | 'DOWNLOAD_USER_SETTINGS'
  | 'DUMP_SYSTEM_PROMPT'
  | 'ENHANCED_TELEMETRY_BETA'
  | 'EXPERIMENTAL_SKILL_SEARCH'
  | 'EXTRACT_MEMORIES'
  | 'FILE_PERSISTENCE'
  | 'FORK_SUBAGENT'
  | 'HARD_FAIL'
  | 'HISTORY_PICKER'
  | 'HISTORY_SNIP'
  | 'HOOK_PROMPTS'
  | 'IS_LIBC_GLIBC'
  | 'IS_LIBC_MUSL'
  | 'KAIROS'
  | 'KAIROS_BRIEF'
  | 'KAIROS_CHANNELS'
  | 'KAIROS_DREAM'
  | 'KAIROS_GITHUB_WEBHOOKS'
  | 'KAIROS_PUSH_NOTIFICATION'
  | 'LODESTONE'
  | 'MCP_RICH_OUTPUT'
  | 'MCP_SKILLS'
  | 'MEMORY_SHAPE_TELEMETRY'
  | 'MESSAGE_ACTIONS'
  | 'MONITOR_TOOL'
  | 'NATIVE_CLIENT_ATTESTATION'
  | 'NATIVE_CLIPBOARD_IMAGE'
  | 'NEW_INIT'
  | 'OVERFLOW_TEST_TOOL'
  | 'PERFETTO_TRACING'
  | 'POWERSHELL_AUTO_MODE'
  | 'PROACTIVE'
  | 'PROMPT_CACHE_BREAK_DETECTION'
  | 'QUICK_SEARCH'
  | 'REACTIVE_COMPACT'
  | 'REVIEW_ARTIFACT'
  | 'RUN_SKILL_GENERATOR'
  | 'SELF_HOSTED_RUNNER'
  | 'SHOT_STATS'
  | 'SKILL_IMPROVEMENT'
  | 'SLOW_OPERATION_LOGGING'
  | 'SSH_REMOTE'
  | 'STREAMLINED_OUTPUT'
  | 'TEAMMEM'
  | 'TEMPLATES'
  | 'TERMINAL_PANEL'
  | 'TOKEN_BUDGET'
  | 'TORCH'
  | 'TRANSCRIPT_CLASSIFIER'
  | 'TREE_SITTER_BASH'
  | 'TREE_SITTER_BASH_SHADOW'
  | 'UDS_INBOX'
  | 'ULTRAPLAN'
  | 'ULTRATHINK'
  | 'UNATTENDED_RETRY'
  | 'UPLOAD_USER_SETTINGS'
  | 'VERIFICATION_AGENT'
  | 'VOICE_MODE'
  | 'WEB_BROWSER_TOOL'
  | 'WORKFLOW_SCRIPTS'

/** Build-time macro constants exported by the shim. */
export interface MacroConstants {
  VERSION: string
  VERSION_CHANGELOG: string
  ISSUES_EXPLAINER: string
  BUILD_TIME: string
  COMMIT_HASH: string
}

/**
 * Check if a feature flag is enabled.
 *
 * In Node.js runtime, all flags default to false.
 * Override at runtime via the `OPEN_AGENT_FEATURES` environment variable
 * (comma-separated list of flag names, e.g. `OPEN_AGENT_FEATURES=KAIROS,VOICE_MODE`).
 */
export function feature(name: FeatureFlag | (string & {})): boolean {
  const raw = process.env.OPEN_AGENT_FEATURES
  if (!raw) return false
  const enabledFeatures = raw.split(',').map((s) => s.trim())
  return enabledFeatures.includes(name)
}

/**
 * Embed a file at build time.
 * Not available in Node.js runtime -- always returns null.
 */
export function embed(_path: string): Buffer | null {
  return null
}

export const MACRO: MacroConstants = {
  VERSION: '0.1.0',
  VERSION_CHANGELOG: '',
  ISSUES_EXPLAINER: 'report the issue at https://github.com/shipany-ai/open-agent-sdk/issues',
  BUILD_TIME: new Date().toISOString(),
  COMMIT_HASH: 'dev',
}
