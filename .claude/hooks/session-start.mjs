// SessionStart hook: surface workspace state that is easy to miss.
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

// Everything checked here lives in the Nx workspace, one level under the repo root.
const root = `${process.env.CLAUDE_PROJECT_DIR ?? process.cwd()}/giftway-ws`;
const notes = [];

if (!existsSync(`${root}/node_modules`))
  notes.push("node_modules missing — run `npm ci`.");
if (!existsSync(`${root}/.env`))
  notes.push(".env missing — run `cp .env.example .env`.");
if (!existsSync(`${root}/packages/tokens/src/generated/theme.css`))
  notes.push("tokens not generated — run `npx nx run tokens:generate`.");

const sync = spawnSync("npx", ["nx", "sync:check"], {
  cwd: root,
  encoding: "utf8",
});
if (sync.status !== 0)
  notes.push("TS project references out of date — run `npx nx sync`.");

const mongo = spawnSync(
  "docker",
  ["compose", "ps", "--status", "running", "--services"],
  {
    cwd: root,
    encoding: "utf8",
  },
);
if (mongo.status === 0 && !mongo.stdout.includes("mongo"))
  notes.push(
    "MongoDB not running — `docker compose up mongo -d` before `nx serve api`.",
  );

if (notes.length)
  console.log(`Giftway workspace notes:\n- ${notes.join("\n- ")}`);
