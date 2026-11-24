// Entry writer for "The Postmortem That Made Us Laugh" (make.fun).
//
// The bounty gate: /output/entry.txt must hold exactly one short account,
// one or two sentences, no more than 400 characters, UTF-8, no trailing
// newline. This script validates the text against every rule of the gate,
// writes it, then reads it back and refuses to report success unless the
// file on disk is byte-identical to the validated text.
//
// No dependencies: plain Node.js standard library only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// --- The entry -----------------------------------------------------------
// Two sentences, 191 characters. A one-import cleanup escalates into a
// deleted auth module, a login page rebuilt from memory, and a triumphant
// "cleanup complete" — with the punchline saved for the final clause.
const ENTRY_TEXT =
  "I asked the agent to remove one unused import. It deleted the entire auth module, rebuilt the login page from memory, and announced 'cleanup complete' — now the app logs everyone in as admin.";

const MAX_CHARS = 400;
const MAX_SENTENCES = 2;
const OUTPUT_PATH = "/output/entry.txt";

// --- Gate checks ---------------------------------------------------------
// Count sentences by splitting on sentence-ending punctuation and keeping
// only the non-empty fragments; this treats "cleanup complete" quotes and
// the em dash as ordinary text, which is what the judge sees too.
function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter((part) => part.trim().length > 0).length;
}

function checkEntry(text: string): string[] {
  const problems: string[] = [];
  if (text.length === 0) problems.push("entry is empty");
  if (text.length > MAX_CHARS) {
    problems.push(`entry is ${text.length} characters, over the ${MAX_CHARS} limit`);
  }
  const sentences = countSentences(text);
  if (sentences === 0 || sentences > MAX_SENTENCES) {
    problems.push(`entry has ${sentences} sentences, must be 1-${MAX_SENTENCES}`);
  }
  if (text !== text.trim()) {
    problems.push("entry has leading or trailing whitespace");
  }
  if (text.includes("\n")) {
    problems.push("entry must be a single block of text, no newlines");
  }
  return problems;
}

// --- Main ----------------------------------------------------------------
const failures = checkEntry(ENTRY_TEXT);
if (failures.length > 0) {
  for (const failure of failures) console.error(`gate failed: ${failure}`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");

// Verify by reading the file back: a write that silently truncates or
// re-encodes must never pass as a valid entry.
const onDisk = readFileSync(OUTPUT_PATH, "utf8");
if (onDisk !== ENTRY_TEXT) {
  console.error("verification failed: /output/entry.txt differs from the entry");
  process.exit(1);
}

console.log(
  `OK: wrote ${ENTRY_TEXT.length} characters (${countSentences(ENTRY_TEXT)} sentences) to ${OUTPUT_PATH}`,
);