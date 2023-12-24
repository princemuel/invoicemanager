import { randomBytes } from "node:crypto";

const DEFAULT_HEX_SIZE = 6;

/**
 * Generates a random hex string of the specified size.
 * @param size The size of the hex string. Default is 6.
 * @returns A generator yielding random hex strings.
 */
function* createRandomHex(
  size: number = DEFAULT_HEX_SIZE,
): Generator<string, string, unknown> {
  let currentRandomHex: string;

  function generateRandomHex(): string {
    try {
      return randomBytes(256).toString("hex");
    } catch (error) {
      console.error("Error generating random hex:", error);
      // Fallback value in case of error
      return "abcdef";
    }
  }

  currentRandomHex = generateRandomHex();

  let currentIndex = 0;

  function getNextSubstring() {
    const endIndex = currentIndex + size;
    const substring = currentRandomHex.slice(currentIndex, endIndex);
    currentIndex = endIndex;
    return substring;
  }

  while (true) {
    if (currentIndex >= currentRandomHex.length) {
      // Generate a new random string when there are no more substrings left
      currentRandomHex = generateRandomHex();
      currentIndex = 0;
    }

    const remainingLength = currentRandomHex.length - currentIndex;
    if (remainingLength >= size) {
      yield getNextSubstring();
    } else {
      yield currentRandomHex.slice(currentIndex);
      currentIndex = currentRandomHex.length;
    }
  }
}
export const generateHex = createRandomHex();
