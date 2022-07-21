import { gql } from '@apollo/client'

export const HOMEPAGE_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      id
      body
      title
      createdAt
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
