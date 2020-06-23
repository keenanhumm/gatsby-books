const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const BookProfile = path.resolve("src/templates/BookProfile.js")

  return graphql(`
    {
      allBook {
        nodes {
          id
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      throw res.errors
    }

    res.data.allBook.nodes.forEach(book => {
      createPage({
        path: `/books/${book.id}`,
        component: BookProfile,
        context: {
          bookId: book.id,
        },
      })
    })
  })
}
