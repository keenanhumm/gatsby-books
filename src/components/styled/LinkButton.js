import styled from "styled-components"

export const LinkButton = styled.div`
  ${props => props.right && "text-align: right;"}
  ${props => props.center && "text-align: center;"}

  a {
    padding: 1rem;
    background-color: purple;
    color: white;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background-color: indigo;
    }
  }
`
