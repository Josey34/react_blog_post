import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import DataContext from './context/DataContext'
import api from './api/posts'
import { format } from 'date-fns'

const EditPost = () => {

    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const history = useNavigate()
    const {  posts, setPosts } = useContext(DataContext)

    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.editBody)
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), ' dd, MMMM, yyyy pp')
        const updatedPost = { id, title: editTitle, datetime, body: editBody }
        try {
            const response = await api.put(`/posts/${id}`, updatedPost)
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
            setEditTitle('')
            setEditBody('')
            history('/')
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='postTitle'>Title:</label>
                        <input
                            id='postTitle'
                            type='text'
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor='postBody'>Post: </label>
                        <textarea
                            id='postBody'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found!</h2>
                    <p>Well, that's dissapointing...</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost