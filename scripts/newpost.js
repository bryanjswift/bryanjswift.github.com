#!/usr/bin/env node
// Create a new post. Port of the old Ruby `task/newpost` script.
//
//   npm run newpost -- "Title of post"
//   npm run newpost -- --draft "Title of post"
//   npm run newpost -- --journal "Title of entry"
//   npm run newpost -- --categories a,b "Title of post"
//
// Opens the new file in $EDITOR when run from a terminal.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const usage = 'Usage: npm run newpost -- [--draft] [--journal] [--categories a,b] "title of post"';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    draft: { type: "boolean", short: "d", default: false },
    journal: { type: "boolean", short: "j", default: false },
    categories: { type: "string", short: "c", default: "" },
    help: { type: "boolean", short: "h", default: false },
  },
});

const title = positionals.join(" ").trim();
if (values.help || !title) {
  console.log(usage);
  process.exit(values.help ? 0 : 1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const categories = values.categories.split(",").map((c) => c.trim()).filter(Boolean);
if (values.journal) categories.push("journal");
const isJournal = categories.includes("journal");
// Journal entries start unpublished, as they always have.
const published = !values.draft && !isJournal;

const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const day = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
const slug = title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/ +/g, "-");

const dir = values.draft ? "_drafts" : isJournal ? "journal/_posts" : "_posts";
const name = values.draft ? `${slug}.md` : `${day}-${slug}.md`;
const file = join(root, dir, name);

if (existsSync(file)) {
  console.error(`${relative(root, file)} already exists`);
  process.exit(1);
}

mkdirSync(dirname(file), { recursive: true });
writeFileSync(
  file,
  `---
layout: post
title: ${JSON.stringify(title)}
date: ${day} ${time}
published: ${published}
categories: ${JSON.stringify(categories)}
---

`,
);
console.log(`Created ${relative(root, file)}`);

if (process.env.EDITOR && process.stdin.isTTY && process.stdout.isTTY) {
  spawnSync(process.env.EDITOR, [file], { stdio: "inherit", shell: true });
}
