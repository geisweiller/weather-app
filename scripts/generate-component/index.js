import { existsSync, mkdirSync, writeFile } from 'fs';
import { component, story, test } from './component-template.js';

function componentnameToFilename(key) {
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.trim().split(' ').join('-').toLowerCase();
}

// grab component name from terminal argument
// eslint-disable-next-line no-undef
const [name] = process.argv.slice(2);
if (!name) throw new Error('You must include a component name.');

const fileName = componentnameToFilename(name);

const dir = `./src/components/${fileName}/`;

// throw an error if the file already exists
if (existsSync(dir)) throw new Error('A component with that name already exists.');

// create the folder
mkdirSync(dir);

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// component.tsx
writeFile(
  `${dir}/${fileName}.tsx`,
  component(name, fileName),
  writeFileErrorHandler
);

// storybook.ts
writeFile(
  `${dir}/${fileName}.stories.ts`,
  story(name, fileName),
  writeFileErrorHandler
);
// test.tsx
writeFile(`${dir}/${fileName}.test.tsx`, test(fileName), writeFileErrorHandler);
