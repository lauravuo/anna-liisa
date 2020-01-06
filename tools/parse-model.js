import fs from 'fs';

const content = fs.readFileSync('./tools/2020.txt');
const lines = content
  .toString()
  .trim()
  .split('\n');

const model = lines.reduce((result, item) => {
  const splitIndex = item.indexOf('.');
  const orderNbr = item.substring(0, splitIndex);
  const name = item.substring(splitIndex + 1, item.length).trim();
  return { ...result, [orderNbr]: name };
}, {});

console.log(model);
