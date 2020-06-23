import React, { useState, useContext } from "react"
import { FirebaseContext } from "../firebase"

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const { firebase } = useContext(FirebaseContext)

  const handleSubmit = e => {
    e.preventDefault()
    const { email, password } = formValues

    firebase.login({
      email,
      password,
    })
  }

  const handleFormChange = e => {
    e.persist()
    setFormValues(formValues => ({
      ...formValues,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          aria-label="email"
          value={formValues.email}
          type="email"
          placeholder="email"
          name="email"
          onChange={handleFormChange}
        />
        <input
          aria-label="password"
          value={formValues.password}
          type="password"
          placeholder="password"
          name="password"
          onChange={handleFormChange}
        />
        <button type="submit">Log in</button>
      </form>
    </section>
  )
}
