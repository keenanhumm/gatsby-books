import React, { useContext } from "react"
import BookItem from "../components/BookItem"
import BookComments from "../components/BookComments"
import { Card } from "../components/styled"
import { graphql } from "gatsby"
import { FirebaseContext } from "../firebase"

export default function BookProfile(props) {
  const {
    data: { book },
  } = props

  const { firebase } = useContext(FirebaseContext)

  return (
    <section>
      <Card>
        <BookItem book={book} />
      </Card>
      <Card>
        {!!firebase && <BookComments firebase={firebase} bookId={book.id} />}
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
