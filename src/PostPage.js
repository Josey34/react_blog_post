import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'
import api from './api/posts'
import { useNavigate } from 'react-router-dom'
import DataContext from './context/DataContext'

const PostPage = () => {

  const { posts, setPosts } = useContext(DataContext)
  const history = useNavigate()

  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id)

  const handleDelete = async (id) => {
    try {
        await api.delete(`/posts/${id}`)
        const postsList = posts.filter(post => post.id !== id)
        setPosts(postsList)
        history('/')
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.dateTime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        }
        {!post &&
          <>
            <h2>Post not Found!</h2>
            <p>Well, that's dissapointing</p>
            <p>
              <Link to={'/'}>Visit Our Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage