exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  console.log({ page });
  if (page.path.match(/^\/$/)) {
    console.log(`page - ${page} matches the path!`);
    page.matchPath = "/*";

    createPage(page);
  }
};
