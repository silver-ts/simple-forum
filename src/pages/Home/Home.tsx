import { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Header } from '@components/Header'

type Post = {
  body: string
  id: string
  createdAt: string
  title: string
  comments: any
  author: any
}

const QUERY = gql`
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

const Home: FC = () => {
  const { data } = useQuery(QUERY)

  const posts = data?.posts || []
  const reversePosts = [...posts].reverse()

  const getDate = (date: number) =>
    new Date(date).toLocaleString('pt-br').toString()

  return (
    <div>
      <Header />
      {reversePosts?.map((post: Post) => (
        <div
          key={post?.id}
          style={{ background: '#60686c', margin: '20px', padding: '20px' }}
        >
          <h2>{post?.title}</h2>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <strong>By {post?.author?.displayName}</strong> -
            <p>{getDate(parseInt(post?.createdAt, 10))}</p>
          </div>
          <p>{post?.body}</p>
          <div
            style={{
              marginTop: '40px',
              background: '#313537',
              padding: '10px'
            }}
          >
            <h3>comments</h3>
            {post?.comments.map((comment: any) => (
              <div
                key={comment?.id}
                style={{
                  padding: '10px',
                  background: '#494f52',
                  marginTop: '10px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}
                >
                  <strong>{comment?.user?.displayName}</strong>-
                  <p>{getDate(parseInt(comment?.createdAt, 10))}</p>
                </div>
                <p>{comment?.comment}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
