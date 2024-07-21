import React from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataContext from './context/DataContext'
import api from './api/posts'
import { format } from 'date-fns'

const NewPost = () => {

  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const { posts, setPosts } = useContext(DataContext)
  const history = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), ' dd, MMMM, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
        const response = await api.post('/posts', newPost)
        const allPost = [...posts, response.data]
        setPosts(allPost)
        setPostTitle('')
        setPostBody('')
        history('/')
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          id='postTitle'
          type='text'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post: </label>
        <textarea
          id='postBody'
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost