export type Post = {
  body: string
  id: string
  createdAt: string
  updatedAt: string
  title: string
  comments: {
    comment: string
    id: string
    user: {
      displayName: string
      id: string
    }
  }
  author: {
    displayName: string
    id: string
  }
}
