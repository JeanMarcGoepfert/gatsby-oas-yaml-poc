const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `DocumentsYaml`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allDocumentsYaml {
        edges {
          node {
            servers {
              url
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.")
    return
  }

  result.data.allDocumentsYaml.edges.forEach(({node}) => {
    createPage({
      component: require.resolve("./src/templates/oasPage.jsx"),
      path: node.fields.slug,
      context: node
    })
  })
}
