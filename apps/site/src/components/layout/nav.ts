/** The header's sections, in order. `match` says which paths light a section up. */
export const sections = [
  { label: 'Docs', to: '/docs/installation', match: (path: string) => path.startsWith('/docs') },
  { label: 'Components', to: '/components', match: (path: string) => path.startsWith('/components') },
];

export const repository = 'https://github.com/rasengan-dev/rasengan-ui';
