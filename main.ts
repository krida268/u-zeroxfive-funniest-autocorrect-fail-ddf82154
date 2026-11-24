// Funniest Autocorrect Fail — one line, under 200 characters.
// The program writes a single autocorrect fail to /output/entry.txt.
// The fail is a real-looking slip: "see" became "sue" in a text to a date.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I texted my date 'can't wait to see you tonight' — autocorrect sent 'can't wait to sue you tonight.'";

const outDir = process.argv[2] ?? "/output";

// Self-check against the sealed gate before writing anything:
// UTF-8 text of 1 to 199 characters, one line, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 199) {
  throw new Error(`entry is ${ENTRY.length} characters; gate needs 1-199`);
}
if (ENTRY.includes("\n") || ENTRY !== ENTRY.trim()) {
  throw new Error("entry must be exactly one line with no surrounding whitespace");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${join(outDir, "entry.txt")}`);
