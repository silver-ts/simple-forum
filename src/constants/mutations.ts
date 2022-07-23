import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        displayName
      }
    }
  }
`

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $username: String!
    $displayName: String!
    $password: String!
  ) {
    register(
      email: $email
      username: $username
      displayName: $displayName
      password: $password
    ) {
      token
      user {
        id
        username
        displayName
      }
    }
  }
`
