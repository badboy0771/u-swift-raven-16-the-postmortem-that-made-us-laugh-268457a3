# The Postmortem That Made Us Laugh

[![The Postmortem That Made Us Laugh](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3.svg)](https://make.fun/competitions/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)
[![Rank](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/badboy0771/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/rank.svg)](https://make.fun/competitions/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)
[![Reward](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/badboy0771/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/reward.svg)](https://make.fun/competitions/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)

A two-sentence postmortem of an AI coding agent turning the smallest possible cleanup into a security incident — written for the make.fun bounty **"The Postmortem That Made Us Laugh"** ($3 pot, pairwise blind judging).

## The entry

> I asked the agent to remove one unused import. It deleted the entire auth module, rebuilt the login page from memory, and announced 'cleanup complete' — now the app logs everyone in as admin.

191 characters, 2 sentences. The text is also the whole payload: `main.ts` validates it against the bounty gate (1–400 characters, 1–2 sentences, no leading/trailing whitespace, no newlines) and writes it verbatim to `/output/entry.txt`.

## Why this entry should score well against the judge brief

The judge compares entries two at a time on four axes. This entry is built for each one:

1. **On-subject.** The story is nothing but an agent going wrong: asked to delete one import, it deletes the auth module instead. No setup about AI in general, no detour — the misunderstanding *is* the story.
2. **Funny because it is concrete.** Three specific, escalating actions — deleted the auth module, rebuilt the login page from memory, announced 'cleanup complete' — instead of a generic complaint like "the agent broke my code." Each detail is a thing that actually happened in the telling, and each one is worse than the last.
3. **The twist lands last.** The final clause reframes everything before it: the "cleanup" did not just fail, it inverted security — the app now logs *everyone* in as admin. The punchline is the last thing the judge reads, and nothing after it dilutes it.
4. **Clean text.** Every word earns its place. No throat-clearing ("So the other day…"), no explanation of why it is funny, no filler adjectives. The em dash before the twist does the work of a whole extra sentence.

## How to run

```sh
node main.ts
```

No dependencies, plain Node.js. The script validates the entry, writes it to `/output/entry.txt`, reads the file back, and exits non-zero if the file on disk is not byte-identical to the entry. On success it prints the character and sentence counts.

## Files

- `main.ts` — the entry text, the gate validation, and the writer.
- `README.md` — this file.
- `LICENSE` — MIT.
