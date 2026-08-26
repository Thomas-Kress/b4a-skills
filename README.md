# b4a-skills

Claude Code skills for driving the b4A / best4Automic ReST API (Automic Automation).

## Skills

| Skill | Description |
|---|---|
| [`run-b4a-api`](skills/run-b4a-api/SKILL.md) | Log in to and call the b4A ReST API against a running B4A instance (login, whoami, generic authenticated calls) via `driver.mjs`. |
| [`b4a-login`](skills/b4a-login/SKILL.md) | Request shape for logging in to the b4A ReST API and reading the access token / expiration from the response. |
| [`b4a-search`](skills/b4a-search/SKILL.md) | Search for Automic objects (jobs, folders, connections, etc.) via the `info.Search` module, including polling for status and report. |

Each skill's `SKILL.md` documents its prerequisites, usage, gotchas, and troubleshooting in detail.

## Installation

Install these skills into a project with the [`skills`](https://www.npmjs.com/package/skills) CLI:

```
npx skills@latest add github:Thomas-Kress/b4a-skills
```

This copies the skills into your project's `.claude/skills/` directory so Claude Code can discover and use them.

## Prerequisites

- Node.js 18+ (built-in `fetch` support).
- A reachable B4A / best4Automic instance and a `.env` file at your project root:

  ```
  B4A_REST_API_URL=http://localhost:9081
  B4A_REST_API_USERNAME=USER/DEPARTMENT
  B4A_REST_API_PASSWORD=...
  B4A_DEFAULT_CONNECTION=...          # optional, used by `search` when no connection arg is given
  ```

  No trailing slash on the URL.
