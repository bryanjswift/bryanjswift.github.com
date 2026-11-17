import markdownIt from "markdown-it";
import markdownItAbbr from "markdown-it-abbr";
import markdownItFootnote from "markdown-it-footnote";

// Header ids the way kramdown generated them, so existing #anchors keep working:
// lowercase, drop everything but letters, numbers, spaces and dashes, then
// turn spaces into dashes.
function kramdownId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/ /g, "-");
}

function headerIds(md) {
  md.core.ruler.push("header_ids", (state) => {
    const used = new Map();
    state.tokens.forEach((token, i) => {
      if (token.type !== "heading_open" || token.attrGet("id")) return;
      const base = kramdownId(state.tokens[i + 1].content) || "section";
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);
      token.attrSet("id", count ? `${base}-${count}` : base);
    });
  });
}

// Footnote markup the way kramdown generated it. Anchors use the footnote's
// label (`[^3]` becomes #fn:3) while the visible number counts up from 1.
function kramdownFootnotes(md) {
  md.use(markdownItFootnote);
  const rules = md.renderer.rules;
  const label = (env, tokens, idx) =>
    tokens[idx].meta.label ?? env.footnotes.list[tokens[idx].meta.id].label ?? tokens[idx].meta.id + 1;
  const subId = (tokens, idx) =>
    tokens[idx].meta.subId > 0 ? `:${tokens[idx].meta.subId}` : "";
  rules.footnote_ref = (tokens, idx, options, env) =>
    `<sup id="fnref:${label(env, tokens, idx)}${subId(tokens, idx)}" role="doc-noteref">` +
    `<a href="#fn:${label(env, tokens, idx)}" class="footnote" rel="footnote">${tokens[idx].meta.id + 1}</a></sup>`;
  rules.footnote_block_open = () => `<div class="footnotes" role="doc-endnotes">\n<ol>\n`;
  rules.footnote_block_close = () => `</ol>\n</div>\n`;
  rules.footnote_open = (tokens, idx, options, env) =>
    `<li id="fn:${label(env, tokens, idx)}" role="doc-endnote">`;
  rules.footnote_close = () => `</li>\n`;
  rules.footnote_anchor = (tokens, idx, options, env) =>
    ` <a href="#fnref:${label(env, tokens, idx)}${subId(tokens, idx)}" class="reversefootnote" role="doc-backlink">&#8617;</a>`;
}

// kramdown parsed Markdown inside HTML blocks marked `markdown="1"`. Blank
// lines inside the block let markdown-it do the same.
function kramdownMarkdownAttr(md) {
  md.core.ruler.before("block", "markdown_attr", (state) => {
    state.src = state.src.replace(
      /^(<(\w+)[^>\n]*?)\s+markdown="1"([^>\n]*>)\n([\s\S]*?)\n<\/\2>/gm,
      "$1$3\n\n$4\n\n</$2>",
    );
  });
}

// kramdown's typographic symbols: `---`, `--` and `...` only. markdown-it's own
// replacements also turn `..` into an ellipsis and `(c)` into a symbol.
function kramdownTypography(md) {
  md.disable("replacements");
  md.core.ruler.after("smartquotes", "kramdown_typography", (state) => {
    for (const block of state.tokens) {
      if (block.type !== "inline") continue;
      let inRawCode = false;
      block.children.forEach((token, i) => {
        if (token.type === "html_inline") {
          if (/^<(code|kbd|samp|tt)\b/i.test(token.content)) inRawCode = true;
          if (/^<\/(code|kbd|samp|tt)>/i.test(token.content)) inRawCode = false;
        }
        if (token.type !== "text" || inRawCode) return;
        token.content = token.content
          .replace(/---/g, "\u2014")
          .replace(/--/g, "\u2013")
          .replace(/\.\.\./g, "\u2026");
        // An apostrophe right after a link or code span, as in [Name](url)'s.
        const prev = block.children[i - 1];
        if (prev && /_close$|^code_inline$|^html_inline$/.test(prev.type)) {
          token.content = token.content.replace(/^'(?=\w)/, "\u2019");
        }
      });
    }
  });
}

// The site's Markdown renderer: markdown-it configured to produce the same
// output kramdown did under Jekyll.
export function createMarkdown() {
  return markdownIt({ html: true, typographer: true, xhtmlOut: true })
    .enable("code")
    .use(kramdownMarkdownAttr)
    .use(kramdownTypography)
    .use(markdownItAbbr)
    .use(kramdownFootnotes)
    .use(headerIds);
}
