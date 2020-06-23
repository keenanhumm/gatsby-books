import React from "react"
import { Link } from "gatsby"

import BookItem from "./BookItem"
import Card from "./styled/Card"
import LinkButton from "./styled/LinkButton"

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
