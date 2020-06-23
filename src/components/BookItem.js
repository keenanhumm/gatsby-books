import React from "react"
import BookCoverImage from "./styled/BookCoverImage"
import BookPreviewDetails from "./styled/BookPreviewDetails"
import BookItemWrapper from "./styled/BookItemWrapper"
import Img from "gatsby-image"

export default function BookItem(props) {
  const {
    book: {
      title,
      summary,
      author,
      localImage: {
        childImageSharp: { fixed },
      },
    },
  } = props

  return (
    <BookItemWrapper>
      <BookCoverImage>
        <Img fixed={fixed} />
      </BookCoverImage>
      <BookPreviewDetails>
        <h2>{title}</h2>
        <h5>by {author.name}</h5>
        <p>{summary}</p>
      </BookPreviewDetails>
    </BookItemWrapper>
  )
}
