import React, { useEffect, useState, useCallback } from "react"
import { CommentsList, CommentForm, Button, Input } from "./styled"
import { formatDate } from "../utils"

export default function BookComments(props) {
  const { bookId, firebase } = props

  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")

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

  const handleSubmitComment = e => {
    e.preventDefault()
    firebase.postComment({
      text: commentText,
      bookId,
    })
    setCommentText("")
  }

  const handleCommentChange = useCallback(e => {
    e.persist()
    setCommentText(e.target.value)
  }, [])

  return (
    <>
      <CommentForm onSubmit={handleSubmitComment}>
        <h3>Comments</h3>
        <Input
          placeholder="What are your thoughts on this title?"
          onChange={handleCommentChange}
          value={commentText}
        />
        <Button right type="submit">
          Post comment
        </Button>
      </CommentForm>
      {comments.map(comment => (
        <CommentsList key={comment.id}>
          <strong>{comment.username}</strong> -{" "}
          <small>{formatDate(comment.dateCreated)}</small>
          <div>{comment.text}</div>
        </CommentsList>
      ))}
    </>
  )
}
