import React, { useState, useCallback, useContext } from "react"
import { Form, Input, Button } from "../components/styled"
import { FirebaseContext } from "../firebase"

export default function AddAuthor() {
  const { firebase } = useContext(FirebaseContext)
  const [name, setName] = useState("")
  const [success, setSuccess] = useState(false)

  const handleNameChange = useCallback(e => {
    e.persist()
    setName(e.target.value)
    setSuccess(false)
  }, [])
  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      firebase
        .createAuthor({
          name,
        })
        .then(() => {
          setName("")
          setSuccess(true)
        })
    },
    [name, firebase]
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={handleNameChange}
        placeholder="Author name"
      />
      {!!success && <span>Author created successfully!</span>}
      <Button type="submit" block>
        Add author
      </Button>
    </Form>
  )
}
