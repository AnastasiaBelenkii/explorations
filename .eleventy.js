module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.addGlobalData("layout", "base.njk");

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/newsreader": "fontsource/newsreader",
    "node_modules/@fontsource/fraunces": "fontsource/fraunces"
  });

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
