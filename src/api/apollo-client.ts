import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { offsetLimitPagination } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL
})

const authLink = setContext((_, { headers }) => {
  // TODO: Remove localStorage and replace with zustrand
  const token = localStorage.getItem('cluster-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: offsetLimitPagination(),
        comments: {
          keyArgs: ['postId'],
          merge(existing, incoming, { args: { offset = 0 } }) {
            const merged = existing ? existing.slice(0) : []
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i]
            }
            return merged
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
})

export default client
