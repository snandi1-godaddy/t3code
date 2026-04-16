import type { ServerSettings } from "@t3tools/contracts";

/**
 * Build environment variable overrides from the unified GoCode connection
 * settings. The returned object maps `GOCODE_BASE_URL` to the provider-
 * specific base URL variables and `GOCODE_API_TOKEN` to the provider-
 * specific auth/key variables.
 *
 * Only non-empty values produce overrides so that provider-native config
 * (env vars, config files) is preserved when GoCode fields are blank.
 */
export function buildGocodeEnvOverrides(settings: ServerSettings): Record<string, string> {
  const overrides: Record<string, string> = {};
  const { gocode } = settings;
  if (gocode.baseUrl) {
    overrides.OPENAI_BASE_URL = gocode.baseUrl;
    overrides.ANTHROPIC_BASE_URL = gocode.baseUrl;
    overrides.ANTHROPIC_API_URL = gocode.baseUrl;
  }
  if (gocode.apiToken) {
    overrides.OPENAI_API_KEY = gocode.apiToken;
    overrides.ANTHROPIC_AUTH_TOKEN = gocode.apiToken;
  }
  return overrides;
}
