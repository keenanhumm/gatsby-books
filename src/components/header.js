import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FirebaseContext } from "../firebase"
import {
  LogoutLink,
  AppHeader,
  HeaderContent,
  UserInfo,
  LoginLink,
  Divider,
} from "./styled"

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext)

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
              Hello, {user.username || user.email}
              <div>
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
