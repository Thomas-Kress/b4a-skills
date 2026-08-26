#!/usr/bin/env node
// Driver for the b4A / best4Automic ReST API: logs in and makes authenticated
// calls against a running B4A instance. See SKILL.md in this directory.
//
// Usage:
//   node driver.mjs login                 # authenticate, cache token
//   node driver.mjs whoami                # GET /version using cached/fresh token (smoke check)
//   node driver.mjs call <METHOD> <PATH> [JSON_BODY]   # generic authenticated call
//   node driver.mjs search [CONNECTION]   # POST /module info.Search (uses B4A_DEFAULT_CONNECTION if omitted)
//
// Config comes from <repo-root>/.env:
//   B4A_REST_API_URL=http://localhost:9081
//   B4A_REST_API_USERNAME=USER/DEPT
//   B4A_REST_API_PASSWORD=...
//   B4A_DEFAULT_CONNECTION=...            # optional, used by `search` when no connection arg given

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// this file lives at <root>/.claude/skills/run-b4a-api/driver.mjs
const ROOT_DIR = join(__dirname, "..", "..", "..");
const ENV_PATH = join(ROOT_DIR, ".env");
const CACHE_PATH = join(tmpdir(), "b4a-driver-session.json");

function loadEnv() {
  if (!existsSync(ENV_PATH)) {
    throw new Error(`Missing ${ENV_PATH}. Needs B4A_REST_API_URL, B4A_REST_API_USERNAME, B4A_REST_API_PASSWORD.`);
  }
  const env = {};
  for (const line of readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  for (const key of ["B4A_REST_API_URL", "B4A_REST_API_USERNAME", "B4A_REST_API_PASSWORD"]) {
    if (!env[key]) throw new Error(`${key} not set in ${ENV_PATH}`);
  }
  return env;
}

function loadCache() {
  if (!existsSync(CACHE_PATH)) return null;
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return null;
  }
}

async function login() {
  const env = loadEnv();
  const res = await fetch(`${env.B4A_REST_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: env.B4A_REST_API_USERNAME,
      password: env.B4A_REST_API_PASSWORD,
      language: "en",
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Login failed: HTTP ${res.status} ${JSON.stringify(body)}`);
  }
  const token = res.headers.get("authorization");
  if (!token) throw new Error("Login succeeded but response had no Authorization header");
  const session = { token, expires: body.expires, base_url: env.B4A_REST_API_URL, user: body.user };
  writeFileSync(CACHE_PATH, JSON.stringify(session, null, 2));
  return session;
}

async function getSession() {
  const cached = loadCache();
  if (cached && cached.expires && new Date(cached.expires).getTime() > Date.now() + 30_000) {
    return cached;
  }
  return login();
}

async function call(method, path, jsonBody) {
  const session = await getSession();
  const res = await fetch(`${session.base_url}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${session.token}`,
      ...(jsonBody ? { "Content-Type": "application/json" } : {}),
    },
    body: jsonBody ? jsonBody : undefined,
  });
  const text = await res.text();
  return { status: res.status, text };
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);

  if (cmd === "login") {
    const session = await login();
    console.log(`Logged in as ${session.user?.username ?? "?"} (${session.user?.firstName ?? ""} ${session.user?.lastName ?? ""}), token expires ${session.expires}`);
    return;
  }

  if (cmd === "whoami") {
    const { status, text } = await call("GET", "/version");
    console.log(`HTTP ${status}`);
    console.log(text);
    if (status !== 200) process.exitCode = 1;
    return;
  }

  if (cmd === "call") {
    const [method, path, jsonBody] = args;
    if (!method || !path) {
      console.error("Usage: node driver.mjs call <METHOD> <PATH> [JSON_BODY]");
      process.exitCode = 1;
      return;
    }
    const { status, text } = await call(method.toUpperCase(), path, jsonBody);
    console.log(`HTTP ${status}`);
    console.log(text);
    if (status >= 400) process.exitCode = 1;
    return;
  }

  if (cmd === "search") {
    const env = loadEnv();
    const connection = args[0] || env.B4A_DEFAULT_CONNECTION;
    if (!connection) {
      console.error("No connection given and B4A_DEFAULT_CONNECTION not set in .env");
      process.exitCode = 1;
      return;
    }
    const body = JSON.stringify({ name: "info.Search", options: { connection } });
    const { status, text } = await call("POST", "/module", body);
    console.log(`HTTP ${status}`);
    console.log(text);
    if (status >= 400) {
      process.exitCode = 1;
      return;
    }
    try {
      const parsed = JSON.parse(text);
      if (parsed._links?.get_module?.href) {
        console.log(`\nFollow up: node driver.mjs call GET //module/${parsed.id} (or //module/${parsed.id}/report)`);
      }
    } catch {
      // response wasn't JSON; nothing to add
    }
    return;
  }

  console.error("Usage: node driver.mjs <login|whoami|call|search>");
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
