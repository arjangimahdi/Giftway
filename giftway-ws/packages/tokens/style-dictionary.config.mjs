const THEME_NAMESPACE_RESETS = [
  '--color-*',
  '--spacing-*',
  '--radius-*',
  '--font-*',
  '--text-*',
  '--font-weight-*',
  '--leading-*',
];

function toThemePath(path) {
  const [root, group, ...rest] = path;

  if (root === 'font') {
    if (group === 'family') return ['font', ...rest];
    if (group === 'size') return ['text', ...rest];
    if (group === 'weight') return ['font', 'weight', ...rest];
    if (group === 'leading') return ['leading', ...rest];
  }

  return path;
}

function setDeep(target, path, value) {
  const key = path[0];

  if (path.length === 1) {
    target[key] = value;
    return;
  }

  target[key] ??= {};
  setDeep(target[key], path.slice(1), value);
}

function serialize(node, indent = '  ') {
  if (typeof node === 'string') return JSON.stringify(node);

  const entries = Object.entries(node).map(
    ([key, value]) =>
      `${indent}${JSON.stringify(key)}: ${serialize(value, `${indent}  `)}`,
  );

  return `{\n${entries.join(',\n')}\n${indent.slice(2)}}`;
}

export default {
  source: ['tokens/**/*.json'],
  hooks: {
    transforms: {
      'name/tailwind-theme': {
        type: 'name',
        transform: (token) => toThemePath(token.path).join('-'),
      },
    },
    formats: {
      'css/tailwind-theme': ({ dictionary }) => {
        const resets = THEME_NAMESPACE_RESETS.map(
          (namespace) => `  ${namespace}: initial;`,
        );
        const declarations = dictionary.allTokens.map(
          (token) => `  --${token.name}: ${token.$value ?? token.value};`,
        );

        return `@theme {\n${resets.join('\n')}\n\n${declarations.join('\n')}\n}\n`;
      },
      'typescript/tokens': ({ dictionary }) => {
        const tree = {};

        for (const token of dictionary.allTokens) {
          setDeep(tree, token.path, String(token.$value ?? token.value));
        }

        const groups = Object.entries(tree).map(
          ([name, value]) =>
            `export const ${name} = ${serialize(value)} as const;\n`,
        );

        return groups.join('\n');
      },
    },
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/tailwind-theme'],
      buildPath: 'src/generated/',
      files: [{ destination: 'theme.css', format: 'css/tailwind-theme' }],
    },
    ts: {
      transforms: ['attribute/cti', 'name/camel'],
      buildPath: 'src/generated/',
      files: [{ destination: 'tokens.ts', format: 'typescript/tokens' }],
    },
  },
};
