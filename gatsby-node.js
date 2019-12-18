const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: `/here${slug}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query FindPages {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  const pageData = result.data.allMarkdownRemark.edges.map(({ node }) => ({
    path: node.fields.slug,
    component: path.resolve('src/templates/post.tsx'),
    context: {
      slug: node.fields.slug,
    },
  }));
  const results = pageData.map(createPage);
  console.log(JSON.stringify(results, null, 4));
};
