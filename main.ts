import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Cat Reviews Its Human: writes the one-star review to /output/entry.txt.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(scriptDir, "entry.txt");
const review = readFileSync(entryPath, "utf8");

// Gate: exactly one line, under 200 characters.
const isSingleLine = !review.includes("\n");
const isWithinLimit = review.length >= 1 && review.length < 200;
if (!isSingleLine || !isWithinLimit) {
  throw new Error("entry must be a single line under 200 characters");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), review);
