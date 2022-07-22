export type Comment = {
  comment: string
  id: string
  createdAt: string
  updatedAt: string
  user: {
    displayName: string
    id: string
  }
}

export type Post = {
  body: string
  id: string
  createdAt: string
  updatedAt: string
  title: string
  comments: Comment
  author: {
    displayName: string
    id: string
  }
}
