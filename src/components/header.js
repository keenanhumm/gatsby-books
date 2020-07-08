import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FirebaseContext } from "../firebase"
import {
  LogoutLink,
  AdminLink,
  AppHeader,
  HeaderContent,
  UserInfo,
  LoginLink,
  Divider,
} from "./styled"

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext)
  console.log({ user })

  const handleLogout = () => {
    firebase.logout().then(() => navigate("/login"))
  }

  return (
    <AppHeader>
      <HeaderContent>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <div>
          {!!user && !!user.email && (
            <UserInfo>
              Hello, <strong>{user.username || user.email}</strong>
              <div>
                {!!user.isAdmin && (
                  <>
                    <AdminLink>
                      <Link to="/add-author">Add author</Link>
                    </AdminLink>
                    <Divider />
                    <AdminLink>
                      <Link to="/add-book">Add book</Link>
                    </AdminLink>
                    <Divider />
                  </>
                )}
                <LogoutLink onClick={handleLogout}>Log out</LogoutLink>
              </div>
            </UserInfo>
          )}
          {(!user || !user.email) && (
            <LoginLink>
              <Link to="/login">Log in</Link>
              <Divider />
              <Link to="/register">Register</Link>
            </LoginLink>
          )}
        </div>
      </HeaderContent>
    </AppHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
