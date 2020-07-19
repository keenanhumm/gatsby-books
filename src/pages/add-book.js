import React, { useState, useContext, useEffect, useCallback } from "react"
import { FirebaseContext } from "../firebase"
import { Form, Input, Button, FormField } from "../components/styled"

let fileReader
// necessary workaround since FileReader cannot be used when building server-side
if (typeof window !== "undefined") fileReader = new FileReader()

export default () => {
  const [coverImage, setCoverImage] = useState("")
  const [title, setTitle] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [summary, setSummary] = useState("")
  const [success, setSuccess] = useState(false)

  const { firebase } = useContext(FirebaseContext)
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    if (firebase) {
      firebase.getAuthors().then(snapshot => {
        const availableAuthors = []
        snapshot.forEach(doc => {
          availableAuthors.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setAuthors(availableAuthors)
        setAuthorId(availableAuthors[0].id)
      })
    }
  }, [firebase])

  useEffect(() => {
    fileReader.addEventListener("load", () => {
      setCoverImage(fileReader.result)
    })
  }, [])

  useEffect(() => {
    if (success) setSuccess(false)
  }, [title, summary, authorId, coverImage])

  const handleChangeTitle = useCallback(e => {
    e.persist()
    setTitle(e.target.value)
  }, [])

  const handleChangeSummary = useCallback(e => {
    e.persist()
    setSummary(e.target.value)
  }, [])

  const handleChangeAuthorId = useCallback(e => {
    e.persist()
    setAuthorId(e.target.value)
  }, [])

  const handleChangeCoverImage = useCallback(e => {
    e.persist()
    fileReader.readAsDataURL(e.target.files[0])
  }, [])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()

      firebase
        .createBook({
          title,
          authorId,
          coverImage,
          summary,
        })
        .then(res => setSuccess(true))
        .catch(err => setSuccess(false))
    },
    [coverImage, title, authorId, firebase]
  )

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <strong>Title</strong>
        <Input
          value={title}
          placeholder="Title"
          onChange={handleChangeTitle}
          required
        />
      </FormField>
      <FormField>
        <strong>Author </strong>
        <select value={authorId} onChange={handleChangeAuthorId} required>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </FormField>
      <FormField>
        <strong>Cover image</strong>
        <Input onChange={handleChangeCoverImage} type="file" required />
      </FormField>
      <FormField>
        <strong>Summary</strong>
        <Input
          onChange={handleChangeSummary}
          type="text"
          placeholder="Summary"
          required
        />
      </FormField>
      {!!success && <span>New book added successfully!</span>}
      <Button type="submit" block>
        Add book
      </Button>
    </Form>
  )
}
