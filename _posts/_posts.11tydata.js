// Jekyll's `/here/:year/:title/` permalinks, with `published: false` entries
// left out of the build. Jekyll collapsed repeated dashes in the filename slug.
export default {
  eleventyComputed: {
    permalink: (data) =>
      data.published === false
        ? false
        : `/here/${data.page.date.getUTCFullYear()}/${data.page.fileSlug.replace(/-+/g, "-")}/`,
    eleventyExcludeFromCollections: (data) => data.published === false,
  },
};
