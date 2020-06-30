import styled from "styled-components"

export const Button = styled.button`
  ${props => props.right && "text-align: right;"}
  ${props => props.center && "text-align: center;"}
  padding: 8px 16px;
  background: rebeccapurple;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  ${props => props.block && "display: block; width: 100%;"}

  &:hover {
    background: indigo;
  }
`
