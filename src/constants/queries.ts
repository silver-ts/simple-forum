import { gql } from '@apollo/client'

export const HOMEPAGE_POSTS_QUERY = gql`
  query GetPosts($offset: Int!, $limit: Int!) {
    posts(offset: $offset, limit: $limit) {
      id
      body
      title
      createdAt
      updatedAt
      author {
        displayName
        id
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
        username
        id
      }
      comments {
        comment
        id
        createdAt
        updatedAt
        user {
          id
          displayName
        }
      }
    }
  }
`

export const GET_COMMENTS_BY_ID = gql`
  query GetComments($postId: ID!, $offset: Int!, $limit: Int!) {
    comments(postId: $postId, offset: $offset, limit: $limit) {
      comment
      createdAt
      updatedAt
      id
      user {
        id
        displayName
        username
      }
    }
  }
`
