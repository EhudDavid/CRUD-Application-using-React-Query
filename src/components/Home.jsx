import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'

import "../Crud.css"

const API_URL = "http://localhost:3001/crud_posts"

const fetchPosts = async () =>{
  const { data } = await axios.get(API_URL)
  return data
}

// Add a post
const createPost = async(newPost) => {
  const {data} = await axios.post(API_URL, newPost)
  return data
}


// Delete a post
const deletePost = async (id) => {
  await axios.delete(`${API_URL}/${id}`)
}

// update a post
const updatePost = async(updatedPostData) => {
  const {data} = await axios.put(`${API_URL}/${updatedPostData.id}`, updatedPostData)
  return data
}

const Home = () => {

  const queryClient = useQueryClient();
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostBody, setNewPostBody] = useState("")
  const [editPost, setEditPost] = useState(null)

  // fetch posts
  const {data : posts, isLoading, isError} = useQuery({
    queryKey:["posts"],
    queryFn:fetchPosts
  })

  // create post mutation
  const createMutation = useMutation({
    mutationFn:createPost,
    onSuccess: (newData) => {
        console.log(newData)
        queryClient.invalidateQueries({queryKey:["posts"]})
        setNewPostTitle("");
        setNewPostBody("");
    }
  })

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn:deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["posts"]})
       
    },

  })

  // Update post Mutation
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']})
      setEditPost(null);
    }
  })

  const handleCreate = () => {
    createMutation.mutate({title:newPostTitle, body:newPostBody})
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete")){
          deleteMutation.mutate(id)
    }
    
  }

  const handleUpdate = () => {
    updateMutation.mutate(editPost)
   }

  if(isLoading) return <div>Loading...</div>

  if (isError) {
    return <div>Error fetching data</div>
  }

  const postsArray = Array.isArray(posts) ? posts : [];

  return (
    <div className='container'>
      <h1>CRUD</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}>
        <input type="text" placeholder='Post Title' value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
        <input type="text" placeholder='Post content' value={newPostBody} onChange={(e) => setNewPostBody(e.target.value)}/>
        <button type='submit'>Create Post</button>
      </form>
      <div>
        {postsArray.map((post) => (
          <div key={post.id} className='post-item'>
            {editPost?.id===post.id?(
              <div className="edit-form">
                <input type="text" placeholder='Post Title' value={editPost.title} onChange={(e) => setEditPost({...editPost, title:e.target.value})}/>
                <input type="text" placeholder='post Body' value={editPost.body} onChange={(e) => setEditPost({...editPost, body:e.target.value})}/>
                <button onClick={handleUpdate}>Save</button>
                <button className='cancel' onClick={() => setEditPost(null)}>Cancel</button>
              </div>
            ):(
                <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <div className='actions'>
                <button onClick={() => setEditPost(post)}>Edit</button>
                <button className='delete' onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home