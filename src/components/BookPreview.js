import React from "react"
import { Link } from "gatsby"

import BookItem from "./BookItem"
import { Card, LinkButton } from "./styled"

export default function BookPreview(props) {
  const { book } = props

  return (
    <Card>
      <BookItem book={book} />
      <LinkButton right>
        <Link to={`/books/${book.id}`}>Join conversation</Link>
      </LinkButton>
    </Card>
  )
}
