import { rmSync } from 'node:fs';

const paths = ['node_modules/.cache/storybook', 'node_modules/.vite', 'storybook-static'];

for (const path of paths) {
  rmSync(path, { recursive: true, force: true });
  console.log(`removed ${path}`);
}
