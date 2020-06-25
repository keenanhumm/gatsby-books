import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import { Form, Input, Button, ErrorMessage } from "../components/styled"
import { FirebaseContext } from "../firebase"

export default function Register() {
  const { firebase } = useContext(FirebaseContext)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  })
  const [errorMessage, setErrorMessage] = useState("")

  const isValid = () => {
    const { password, confirmPassword } = formValues
    return password === confirmPassword
  }

  const handleFormChange = e => {
    e.persist()
    setFormValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { email, password, username } = formValues

    if (isValid()) {
      firebase
        .register({
          email,
          password,
          username,
        })
        .then(() => navigate("/"))
        .catch(err => setErrorMessage(err.message))
    } else {
      setErrorMessage("Password and confirm password fields must match")
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={formValues.email}
        onChange={handleFormChange}
        placeholder="Email"
        type="email"
        required
      />
      <Input
        name="username"
        value={formValues.username}
        onChange={handleFormChange}
        placeholder="Username"
        type="text"
        required
      />
      <Input
        name="password"
        value={formValues.password}
        onChange={handleFormChange}
        placeholder="Password"
        type="password"
        required
        minLength={6}
      />
      <Input
        name="confirmPassword"
        value={formValues.confirmPassword}
        onChange={handleFormChange}
        placeholder="Confirm password"
        type="password"
        required
        minLength={6}
      />
      {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  )
}
