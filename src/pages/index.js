import React from "react"
import { graphql } from "gatsby"

import BookPreview from "../components/BookPreview"

const IndexPage = props => {
  const { data: { allBook: { nodes: books = [] } = {} } = {} } = props

  return (
    <section>
      {books.map(book => (
        <BookPreview key={book.id} book={book} />
      ))}
    </section>
  )
}

export const query = graphql`
  {
    allBook {
      nodes {
        id
        title
        summary
        localImage {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        author {
          name
        }
      }
    }
  }
`
export default IndexPage
