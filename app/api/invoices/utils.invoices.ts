import { randomBytes } from 'node:crypto';

export function* createRandomHex(): Generator<string, string, unknown> {
  let randomHex = randomBytes(256).toString('hex');
  let startIndex = 0;

  function getNextSubstring() {
    const endIndex = startIndex + 6;
    const substring = randomHex.slice(startIndex, endIndex);
    startIndex = endIndex;
    return substring;
  }

  while (true) {
    if (startIndex >= randomHex.length) {
      // Generate a new random string when there are no more substrings left
      randomHex = randomBytes(256).toString('hex');
      startIndex = 0;
    }

    const remainingLength = randomHex.length - startIndex;
    if (remainingLength >= 6) {
      yield getNextSubstring();
    } else {
      yield randomHex.slice(startIndex);
      startIndex = randomHex.length;
    }
  }
}

// export function* createRandomHex(): Generator<string, string, unknown> {
//   let buffer = Buffer.alloc(0);

//   while (true) {
//     if (buffer.length < 6) {
//       const randomHex = randomBytes(256).toString('hex');
//       buffer = Buffer.concat([buffer, Buffer.from(randomHex, 'hex')]);
//     }

//     const endIndex = Math.min(6, buffer.length);
//     const substring = buffer.subarray(0, endIndex).toString('hex');
//     buffer.subarray(endIndex);
//     // const substring = buffer.slice(0, endIndex).toString('hex');
//     // buffer = buffer.slice(endIndex);

//     yield substring;
//   }
// }
