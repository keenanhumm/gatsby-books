import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import { FirebaseContext } from "../firebase"
import { Form, Input, Button, ErrorMessage } from "../components/styled"

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { firebase } = useContext(FirebaseContext)

  const handleSubmit = e => {
    e.preventDefault()
    const { email, password } = formValues

    firebase
      .login({
        email,
        password,
      })
      .then(() => navigate("/"))
      .catch(err => setErrorMessage(err.message))
  }

  const handleFormChange = e => {
    e.persist()
    setErrorMessage("")
    setFormValues(formValues => ({
      ...formValues,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input
          aria-label="email"
          value={formValues.email}
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleFormChange}
          required
        />
        <Input
          aria-label="password"
          value={formValues.password}
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleFormChange}
          required
        />
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit" block>
          Log in
        </Button>
      </Form>
    </section>
  )
}
