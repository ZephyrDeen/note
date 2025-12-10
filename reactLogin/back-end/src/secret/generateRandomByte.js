import crypto from 'node:crypto';
import { getTime } from './generateTimeTag.js';
import fs from 'node:fs';

function generateRandomByte(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

fs.appendFile('random.txt', `${getTime()}: ${generateRandomByte()}\n`, function (err) {
  if (err) {
    err ? console.log(err) : console.log('Random byte generated successfully');
  }
});

export { generateRandomByte };