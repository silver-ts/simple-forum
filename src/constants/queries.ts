import { gql } from '@apollo/client'

export const HOMEPAGE_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      id
      body
      title
      createdAt
      updatedAt
      author {
        displayName
      }
      comments {
        comment
        id
        createdAt
        user {
          displayName
        }
      }
    }
  }
`

export const GET_POST_BY_ID = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      body
      title
      createdAt
      updatedAt
      author {
        displayName
      }
      comments {
        comment
        id
        createdAt
        updatedAt
        user {
          displayName
        }
      }
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
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
    )
  }
`
