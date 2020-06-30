import React from "react"
import { BookCoverImage, BookPreviewDetails, BookItemWrapper } from "./styled"
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
    <>
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
    </>
  )
}
