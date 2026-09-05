module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.addGlobalData("layout", "base.njk");

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("site.js");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/ysabeau/files/ysabeau-latin-300-normal.woff2": "fonts/ysabeau-light.woff2",
    "node_modules/@fontsource/inter/files/inter-latin-300-normal.woff2": "fonts/inter-light.woff2",
    "node_modules/@fontsource/inter/files/inter-latin-300-italic.woff2": "fonts/inter-light-italic.woff2",
    "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2": "fonts/inter-regular.woff2",
    "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2": "fonts/inter-semibold.woff2",
    "node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff2": "fonts/instrument-sans-regular.woff2",
    "node_modules/@fontsource/ysabeau/LICENSE": "fonts/ysabeau-LICENSE.txt",
    "node_modules/@fontsource/inter/LICENSE": "fonts/inter-LICENSE.txt",
    "node_modules/@fontsource/instrument-sans/LICENSE": "fonts/instrument-sans-LICENSE.txt"
  });

  const articleUtils = require("./_includes/article-utils.js");
  Object.entries(articleUtils).forEach(([name, filter]) => eleventyConfig.addFilter(name, filter));

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.inputPath.startsWith("./posts/"))
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("htmlDateString", function (date) {
    return date.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("readableDate", function (date) {
    return new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    }).format(date);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
