/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import AppContent from "../components/styled/AppContent"
import App from "./styled/App"
import { FirebaseContext, useAuth } from "../firebase"

const Layout = ({ children }) => {
  const { user, firebase, loading } = useAuth()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <App>
      <FirebaseContext.Provider value={{ user, firebase, loading }}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <AppContent>
          <main>{children}</main>
        </AppContent>
      </FirebaseContext.Provider>
    </App>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
