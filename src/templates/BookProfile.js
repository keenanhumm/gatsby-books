import React from "react"
import BookItem from "../components/BookItem"
import Card from "../components/styled/Card"
import { graphql } from "gatsby"

export default function BookProfile(props) {
  const {
    data: { book },
  } = props

  return (
    <section>
      <Card>
        <BookItem book={book} />
      </Card>
    </section>
  )
}

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: { eq: $bookId }) {
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
`
