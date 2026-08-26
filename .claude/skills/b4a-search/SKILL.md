---
name: b4a-search
description: Search for Automic objects (jobs, folders, connections, etc.) via the b4A / best4Automic ReST API's info.Search module. Use when the user wants to search for, find, or list objects in Automic through b4A. Requires a valid auth token — obtained automatically here, or see the b4a-login skill for the raw request/response shape.
---

# b4A Object Search

POST `/module` with an `info.Search` job, then poll the returned links for
status and the report. This reuses the login/session/call machinery already
built for `run-b4a-api` — no separate driver script. All paths below are
relative to the repo root; run everything with `MSYS_NO_PATHCONV=1` on
Windows/Git Bash (see [run-b4a-api](../run-b4a-api/SKILL.md) Gotchas).

## Prerequisites

Same `.env` as [run-b4a-api](../run-b4a-api/SKILL.md):

```
B4A_REST_API_URL=http://localhost:9081
B4A_REST_API_USERNAME=USER/DEPARTMENT
B4A_REST_API_PASSWORD=...
B4A_DEFAULT_CONNECTION=AE24-0010    # used when no connection is passed explicitly
```

## Run (agent path)

```
MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs search                # uses B4A_DEFAULT_CONNECTION
MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs search AE24-0010      # explicit connection
```

`search` logs in automatically if there's no valid cached token (same
session cache as `run-b4a-api`), then POSTs
`{"name":"info.Search","options":{"connection":"<connection>"}}` to
`/module`. The server accepts the job asynchronously (`HTTP 202`,
`status: "INITIATED"`) and returns `_links.get_module` /
`_links.get_report` to poll.

Verified output (real instance, id/timestamps differ per run):

```
$ node .claude/skills/run-b4a-api/driver.mjs search
HTTP 202
{"id":254,"updated":"2026-08-26T07:57:13.468+00:00","name":"info.Search","status":"INITIATED",...,
 "_links":{"get_module":{"href":"http://localhost:9081/module/254"},"get_report":{"href":"http://localhost:9081/module/254/report"}}}

Follow up: node driver.mjs call GET //module/254 (or //module/254/report)
```

Poll `get_module` until `status` is no longer `INITIATED`, then fetch
`get_report` for the results. Both links carry only the path — reuse
`run-b4a-api`'s `call` command with `MSYS_NO_PATHCONV=1` and a **single**
leading slash (the double-slash shortcut used elsewhere in this repo breaks
on nested paths — see Gotchas):

```
$ MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs call GET /module/254
HTTP 200
{"id":254,"status":"COMPLETED","returnCode":0,"errorMessage":"",...,
 "_links":{"get_report":{"href":"http://localhost:9081/module/254/report"},"delete_module":{"href":"http://localhost:9081/module/254/cleanup"}}}

$ MSYS_NO_PATHCONV=1 node .claude/skills/run-b4a-api/driver.mjs call GET /module/254/report
HTTP 200
```

Full flow (search → INITIATED → poll → COMPLETED → report) was run
end-to-end against a live instance in this session.

## Run (human path)

None — headless ReST API.

## Gotchas

- **The double-slash MSYS workaround (`//module/254`) fails here** with
  `HTTP 400 Ambiguous URI empty segment` from the server (Jetty), even
  though it works for single-segment paths like `/version`. Use
  `MSYS_NO_PATHCONV=1` with a single slash for anything under `/module/...`.
- **The report body can come back empty** (`HTTP 200`, empty text) right
  after `status` flips to `COMPLETED` — observed on a real search that
  matched objects. Don't treat an empty report as a driver bug; if you need
  the actual content, re-check shortly after or inspect `get_module`'s
  `returnCode`/`errorMessage` first.
- **The server's own default `types` list is much broader** than any
  example you might have seen — a bare `info.Search` (no `types` in
  `options`) searched everywhere Automic-object-shaped (`JOBS`, `JOBP`,
  `FOLD`, `CONN`, `USER`, ... 40+ types), not just a couple. If you need a
  narrower search, add `types: [...]` to `options` in a `call POST /module`
  invocation directly — `search` here only sends `connection`.
- **`/module` requires the same bearer token as everything else** — a 401
  here almost always means the cached session expired or was never
  established; `search` re-logs-in automatically, so a 401 more likely
  means bad credentials in `.env` (see run-b4a-api Troubleshooting).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `No connection given and B4A_DEFAULT_CONNECTION not set in .env` | Pass a connection explicitly: `search <CONNECTION>`, or add `B4A_DEFAULT_CONNECTION=...` to `.env`. |
| `HTTP 400 Ambiguous URI empty segment` when polling `get_module`/`get_report` | You used the `//` double-slash trick on a nested path — switch to `MSYS_NO_PATHCONV=1` with a single slash. |
| `search` returns `HTTP 401` | Credentials in `.env` are wrong/expired — see [run-b4a-api](../run-b4a-api/SKILL.md) Troubleshooting. |
