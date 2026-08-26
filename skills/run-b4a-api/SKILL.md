---
name: run-b4a-api
description: Log in to and call the b4A / best4Automic ReST API (Automic Automation) against a running B4A instance. Use when the user wants to run, drive, test, or smoke-check the b4A ReST API, get an access token, or call authenticated endpoints like /version or /module. b4A and best4Automic are the same product. Object search specifically is also covered by the sibling b4a-search skill.
---

# Run: b4A ReST API

There is no app to build here — b4A (best4Automic) is an already-running
third-party Automic Automation ReST service. This skill drives it with a
Node.js CLI script: `.claude/skills/run-b4a-api/driver.mjs`. All paths below
are relative to the repo root.

## Prerequisites

- Node.js with built-in `fetch` (verified with v23.5.0; anything with global
  `fetch`, i.e. Node 18+, works).
- A reachable B4A instance and a `.env` file at the repo root:

  ```
  B4A_REST_API_URL=http://localhost:9081
  B4A_REST_API_USERNAME=USER/DEPARTMENT
  B4A_REST_API_PASSWORD=...
  B4A_DEFAULT_CONNECTION=...          # optional, used by `search` when no connection arg given
  ```

  No trailing slash on the URL.

## Run (agent path)

Run everything with `MSYS_NO_PATHCONV=1` on Windows/Git Bash (see Gotchas):

```
MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs login          # authenticate, cache token
MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs whoami         # authenticated GET /version smoke check
MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs call GET /module/254   # generic authenticated call
MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs search         # POST /module info.Search (see b4a-search skill)
```

Verified output (real instance, values differ per environment):

```
$ node .claude/skills/run-b4a-api/driver.mjs login
Logged in as TKRESS/BBC (Thomas Kress), token expires 2026-08-25T23:41:10.000Z

$ node .claude/skills/run-b4a-api/driver.mjs whoami
HTTP 200
{"core":"7.0.0","rest":"v4","ae":"24.4.5+build.1783516462172"}

$ MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs call GET /module/254
HTTP 200
{"id":254,"status":"COMPLETED",...}
```

`call` also accepts a JSON body for writes: `call POST <PATH> '{"key":"value"}'`
(not exercised here — no known-safe write endpoint on this instance to test
against without side effects).

`login` POSTs `{username, password, language: "en"}` to `/login`, reads the
token from the `Authorization` response header, and caches
`{token, expires, base_url, user}` as JSON in `os.tmpdir()/b4a-driver-session.json`.
`whoami` and `call` reuse that cached token if it has more than 30s left
before `expires`, otherwise they transparently re-login first — you don't
need to call `login` yourself before `whoami`/`call`.

`call <METHOD> <PATH> [JSON_BODY]` hits `<base_url><PATH>` with
`Authorization: Bearer <token>`, prints `HTTP <status>` then the raw response
body, and exits non-zero on 4xx/5xx.

## Run (human path)

None — this is a headless ReST API, there's nothing to open in a browser.
The driver above is the only way to interact with it.

## Gotchas

- **Git Bash on Windows mangles leading-slash paths.** `call GET /version`
  gets MSYS-path-converted into `.../Git/version` before it ever reaches
  Node, and the request fails with "Failed to parse URL". Fix: prefix a
  second slash (`//version`) as shown above, or run with
  `MSYS_NO_PATHCONV=1` set.
  **Prefer `MSYS_NO_PATHCONV=1` with a single slash.** The double-slash
  trick only reliably works for single-segment paths (`//version`,
  `//clients`). For nested paths like `//module/254` the server (Jetty)
  rejects the literal double slash with `400 Ambiguous URI empty segment`
  — verified while polling a search job. `MSYS_NO_PATHCONV=1 node
  driver.mjs call GET /module/254` works correctly in every case tested.
- **`/login` itself needs no Authorization header**, but almost every other
  endpoint returns `401` even for endpoints that "look" public — `/version`
  and `/` both 401 without a token. Always go through `login`/`whoami`/`call`
  (which attach the bearer token) rather than raw `curl`/`fetch`.
- **The password in `.env` is not plaintext** — it's an Automic-encrypted
  credential (starts with `--`). Pass it through unmodified; don't try to
  decode or re-encode it.
- **Guessed endpoint paths mostly 401, not 404**, e.g. `/clients`, `/info`,
  `/api/version` all returned 401 even though `/version` (200) is the real
  one. A 401 on an unfamiliar path doesn't necessarily mean the token is
  bad — it may just be the wrong path. Confirm against `/version` first.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Missing <repo>\.env. Needs B4A_REST_API_URL, ...` | Create `.env` at the repo root with the three `B4A_REST_API_*` vars (see Prerequisites). |
| `Failed to parse URL from http://host:port<repo-path>/...` | Git Bash path-mangled the endpoint arg — rerun with a leading `//` or `MSYS_NO_PATHCONV=1` (see Gotchas). |
| `Login failed: HTTP 401 ...` | Credentials in `.env` are wrong/expired for this B4A instance. |
| `whoami`/`call` returns `HTTP 401` right after a successful `login` | You hit a path that requires different permissions or doesn't exist under auth — verify against `/version` first, not against guessed paths. |
