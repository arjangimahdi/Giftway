// PostToolUse hook: run Prettier on the file that was just written.
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { extname } from 'node:path';

const input = JSON.parse(readFileSync(0, 'utf8'));
const filePath = input?.tool_input?.file_path;
if (!filePath || !existsSync(filePath)) process.exit(0);

const formattable = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.css',
  '.md',
  '.yml',
  '.yaml',
]);
if (!formattable.has(extname(filePath))) process.exit(0);
if (/node_modules|\/dist\/|\/out-tsc\//.test(filePath)) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
spawnSync('npx', ['prettier', '--write', '--log-level', 'warn', filePath], {
  cwd: root,
  stdio: 'inherit',
});
