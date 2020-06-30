import React, { useEffect, useState } from "react"
import { CommentsList, CommentForm, Button, Input } from "./styled"

export default function BookComments(props) {
  const { bookId, firebase } = props

  const [comments, setComments] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: s => {
        const comments = []
        s.forEach(doc => {
          comments.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setComments(comments)
      },
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [bookId, firebase])

  return (
    <>
      <CommentForm>
        <h3>Comments</h3>
        <Input />
        <Button right>Post comment</Button>
      </CommentForm>
      {comments.map(comment => (
        <CommentsList key={comment.id}>
          <strong>{comment.username}</strong>
          <div>{comment.text}</div>
        </CommentsList>
      ))}
    </>
  )
}
