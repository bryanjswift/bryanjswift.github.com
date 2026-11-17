import { createMarkdown } from "./lib/markdown.js";

const isPublished = (item) => item.data.published !== false;
const byDate = (a, b) => a.date - b.date;

export default function (eleventyConfig) {
  eleventyConfig.addExtension("markdown", { key: "md" });

  eleventyConfig.setLibrary("md", createMarkdown());

  // Eleventy turns off indented code blocks by default, even in a custom
  // library; the old posts use them.
  eleventyConfig.amendLibrary("md", (md) => md.enable("code"));

  // Jekyll rendered dates in the site timezone, which was UTC on Vercel.
  eleventyConfig.setLiquidOptions({ timezoneOffset: 0 });

  // Jekyll accepted front matter dates without seconds, like `2011-12-13 22:50`.
  eleventyConfig.addDateParsing((value) => {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) {
      return new Date(`${value.replace(" ", "T")}:00Z`);
    }
  });

  eleventyConfig.addFilter("cdata_escape", (value = "") =>
    String(value).replaceAll("]]>", "]]&gt;"),
  );
  // Make root-relative links and images absolute so they work in feed readers.
  eleventyConfig.addFilter("expand_urls", (value = "", base = "") =>
    String(value).replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`),
  );

  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob(["_posts/*.{md,markdown}", "journal/_posts/*.{md,markdown}"])
      .filter(isPublished)
      .sort(byDate),
  );
  eleventyConfig.addCollection("journal", (api) =>
    api
      .getFilteredByGlob("journal/_posts/*.{md,markdown}")
      .filter(isPublished)
      .sort(byDate),
  );

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("*.{asc,pdf}");
  eleventyConfig.addPassthroughCopy("keybase.txt");

  eleventyConfig.ignores.add(".claude/**");
  eleventyConfig.ignores.add("_drafts/**");
  eleventyConfig.ignores.add("resume/_source.md");
  eleventyConfig.ignores.add("scripts/**");
  eleventyConfig.ignores.add("lib/**");

  // _data/resume.js parses resume/_source.md, which isn't a page itself.
  eleventyConfig.addWatchTarget("resume/_source.md");

  return {
    templateFormats: ["md", "markdown", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
  };
}
