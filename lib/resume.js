// Parse resume/_source.md into the data resume/index.liquid renders. Loaded
// by _data/resume.js.
//
// The source is plain Markdown with a few conventions:
//
//   front matter           exact start and end dates, keyed by company or school
//   # Name
//   key: value contact lines (mobile, email), then a location line
//   ## Summary             paragraphs
//   ## Human Skills        a list
//   ## Technical Skills    ### groups, each a list
//   ## Recent Job History  ### Title at [Company](url) from Month YYYY until Month YYYY
//                          ### Earlier Experience, a list
//   ## Education           ### Degree at School from Month YYYY until Month YYYY
//
// Anything that doesn't fit stops the build with an error instead of quietly
// dropping content from the page.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { load as loadYaml } from "js-yaml";
import { createMarkdown } from "./markdown.js";

const SOURCE = fileURLToPath(new URL("../resume/_source.md", import.meta.url));

const SECTIONS = {
  summary: "Summary",
  humanSkills: "Human Skills",
  technicalSkills: "Technical Skills",
  jobs: "Recent Job History",
  education: "Education",
};
const EARLIER = "Earlier Experience";

const ROLE =
  /^(?<title>.+?) at (?<org>\[[^\]]+\]\([^)\s]+\)|.+?) from (?<start>[A-Z][a-z]+ \d{4})(?: until (?<end>[A-Z][a-z]+ \d{4}))?$/;
const LINK = /^\[(?<text>[^\]]+)\]\((?<url>[^)\s]+)\)$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const md = createMarkdown();

class ResumeError extends Error {
  constructor(message, line) {
    super(`resume/_source.md${line ? `:${line}` : ""}: ${message}`);
  }
}

// Separate the YAML front matter from the Markdown, remembering how many lines
// it took so error messages point at the right line.
function frontMatter(source) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(source);
  if (!match) return { data: {}, body: source, offset: 0 };
  let data;
  try {
    data = loadYaml(match[1]) ?? {};
  } catch (error) {
    throw new ResumeError(`invalid front matter: ${error.message}`);
  }
  return { data, body: source.slice(match[0].length), offset: match[0].split("\n").length - 1 };
}

// Split the Markdown into a tree of headings. Each node keeps its heading text,
// the source line it came from, the body lines before the next heading, and
// its child headings.
function outline(source, offset) {
  const root = { level: 0, children: [], body: [] };
  const stack = [root];
  source.split("\n").forEach((text, i) => {
    const heading = /^(#{1,3}) (.+?)\s*$/.exec(text);
    if (!heading) {
      stack.at(-1).body.push(text);
      return;
    }
    const node = { level: heading[1].length, title: heading[2], line: offset + i + 1, children: [], body: [] };
    while (stack.at(-1).level >= node.level) stack.pop();
    stack.at(-1).children.push(node);
    stack.push(node);
  });
  return root;
}

const bodyText = (node) => node.body.join("\n").trim();

function noChildren(node) {
  if (node.children.length) {
    throw new ResumeError(`unexpected heading "${node.children[0].title}" under "${node.title}"`, node.children[0].line);
  }
}

// A body that is a single bullet list of one-paragraph items, returned as the
// rendered contents of each item. Uses markdown-it's own parse so the list
// means exactly what Markdown says it means.
function listItems(node) {
  const env = {};
  const tokens = md.parse(bodyText(node), env);
  const topLevel = tokens.filter((token) => token.level === 0);
  const fail = () => {
    throw new ResumeError(`expected "${node.title}" to contain only a bullet list with one paragraph per item`, node.line);
  };
  if (topLevel.length !== 2 || topLevel[0].type !== "bullet_list_open") fail();
  const items = [];
  tokens.forEach((token, i) => {
    if (token.type !== "list_item_open" || token.level !== 1) return;
    const close = tokens.findIndex((t, j) => j > i && t.type === "list_item_close" && t.level === 1);
    const inner = tokens.slice(i + 1, close).filter((t) => t.type === "inline");
    if (inner.length !== 1) fail();
    items.push(md.renderer.renderInline(inner[0].children, md.options, env));
  });
  return items;
}

// The exact date from front matter for a heading's "Month YYYY", checked so the
// two can't drift apart.
function exactDate(value, monthYear, org, which, line) {
  const field = `dates.${org}.${which}`;
  if (value instanceof Date) value = value.toISOString().slice(0, 10);
  if (value == null) throw new ResumeError(`missing ${field} in front matter for "${monthYear}"`, line);
  if (typeof value !== "string" || !ISO_DATE.test(value)) {
    throw new ResumeError(`${field} should be a date like "2021-05-14", got ${JSON.stringify(value)}`, line);
  }
  const [month, year] = monthYear.split(" ");
  const expected = `${year}-${String(MONTHS.indexOf(month) + 1).padStart(2, "0")}`;
  if (!value.startsWith(`${expected}-`)) {
    throw new ResumeError(`${field} is ${value}, which doesn't match "${monthYear}" in the heading`, line);
  }
  return value;
}

// "Title at [Org](url) from Month YYYY until Month YYYY"
function role(node, dates, used) {
  const match = ROLE.exec(node.title);
  if (!match) {
    throw new ResumeError(
      `expected a heading like "Title at Company from May 2021" or "... from May 2020 until May 2021", got "${node.title}"`,
      node.line,
    );
  }
  const { title, org, start, end } = match.groups;
  for (const date of [start, end].filter(Boolean)) {
    if (!MONTHS.includes(date.split(" ")[0])) throw new ResumeError(`unknown month in "${date}"`, node.line);
  }
  const link = LINK.exec(org);
  const orgText = link ? link.groups.text : org;
  noChildren(node);
  if (!bodyText(node)) throw new ResumeError(`"${node.title}" has no description`, node.line);
  const exact = dates[orgText] ?? {};
  used.add(orgText);
  if (!end && exact.end != null) {
    throw new ResumeError(`dates.${orgText}.end is set but the heading has no "until" date`, node.line);
  }
  return {
    title: md.renderInline(title),
    org: md.renderInline(orgText),
    url: link?.groups.url ?? null,
    start,
    startIso: exactDate(exact.start, start, orgText, "start", node.line),
    end: end ?? null,
    endIso: end ? exactDate(exact.end, end, orgText, "end", node.line) : null,
    html: md.render(bodyText(node)),
  };
}

function contact(lines, line) {
  const result = { phone: null, email: null, location: null };
  for (const text of lines.map((l) => l.trim()).filter(Boolean)) {
    const field = /^(mobile|phone|email):\s*(.+)$/i.exec(text);
    if (!field) {
      if (result.location) throw new ResumeError(`unexpected contact line "${text}"`, line);
      result.location = md.renderInline(text);
    } else if (field[1].toLowerCase() === "email") {
      result.email = field[2];
    } else {
      result.phone = { display: field[2], href: `tel:+${field[2].replace(/\D/g, "")}` };
    }
  }
  for (const [key, value] of Object.entries(result)) {
    if (!value) throw new ResumeError(`missing ${key} in the contact lines under the name`, line);
  }
  return result;
}

export function parseResume(source) {
  const { data, body, offset } = frontMatter(source);
  const dates = data.dates ?? {};
  const tree = outline(body, offset);
  if (bodyText(tree)) throw new ResumeError("expected the file to start with a # Name heading", 1);
  const [person, ...extra] = tree.children;
  if (!person || person.level !== 1) throw new ResumeError("expected the file to start with a # Name heading", 1);
  if (extra.length) throw new ResumeError(`only one # heading is allowed, found "${extra[0].title}"`, extra[0].line);

  const names = person.title.split(/\s+/);
  const sections = {};
  for (const node of person.children) {
    const key = Object.keys(SECTIONS).find((k) => SECTIONS[k] === node.title);
    if (!key) {
      throw new ResumeError(
        `unknown section "${node.title}"; expected one of: ${Object.values(SECTIONS).join(", ")}`,
        node.line,
      );
    }
    if (sections[key]) throw new ResumeError(`section "${node.title}" appears twice`, node.line);
    sections[key] = node;
  }
  for (const [key, title] of Object.entries(SECTIONS)) {
    if (!sections[key]) throw new ResumeError(`missing section "## ${title}"`);
  }

  const { summary, humanSkills, technicalSkills, jobs, education } = sections;
  noChildren(summary);
  noChildren(humanSkills);
  if (bodyText(technicalSkills)) {
    throw new ResumeError(`expected only ### groups under "Technical Skills"`, technicalSkills.line);
  }
  if (bodyText(jobs) || bodyText(education)) {
    const node = bodyText(jobs) ? jobs : education;
    throw new ResumeError(`expected only ### entries under "${node.title}"`, node.line);
  }

  const earlier = jobs.children.filter((node) => node.title === EARLIER);
  if (earlier.length > 1) throw new ResumeError(`"${EARLIER}" appears twice`, earlier[1].line);
  earlier.forEach(noChildren);

  const used = new Set();
  const jobEntries = jobs.children.filter((node) => node.title !== EARLIER).map((node) => role(node, dates, used));
  const educationEntries = education.children.map((node) => role(node, dates, used));
  const unused = Object.keys(dates).filter((org) => !used.has(org));
  if (unused.length) {
    throw new ResumeError(`front matter has dates for "${unused.join('", "')}", which isn't on the resume`);
  }

  return {
    name: { full: person.title, first: names[0], middle: names.slice(1, -1).join(" "), last: names.at(-1) },
    contact: contact(person.body, person.line),
    headings: Object.fromEntries(Object.keys(SECTIONS).map((key) => [key, sections[key].title])),
    summary: md.render(bodyText(summary)),
    humanSkills: listItems(humanSkills),
    technicalSkills: technicalSkills.children.map((group) => {
      noChildren(group);
      return { title: md.renderInline(group.title), items: listItems(group) };
    }),
    jobs: jobEntries,
    earlier: earlier.length ? { title: EARLIER, items: listItems(earlier[0]) } : null,
    education: educationEntries,
  };
}

export async function loadResume() {
  return parseResume(await readFile(SOURCE, "utf8"));
}
