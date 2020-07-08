import React, { useState, useCallback } from "react"
import { Form, Input, Button } from "../components/styled"

export default function AddAuthor() {
  const [name, setName] = useState("")

  const handleNameChange = useCallback(e => {
    e.persist()
    setName(e.target.value)
  }, [])
  const handleSubmit = useCallback(e => {
    e.preventDefault()
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={handleNameChange}
        placeholder="Author name"
      />
      <Button type="submit" block>
        Add author
      </Button>
    </Form>
  )
}
