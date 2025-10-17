import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

const fetchPostById = (postId) =>{
    return axios.get(`http://localhost:3001/posts/${postId}`)
}

const ReactQueryById = () => {

    const {postId} = useParams();
    const {data, isLoading, isError, error} = useQuery({
        queryKey:["posts", postId],
        queryFn: () => fetchPostById(postId)
    })

    if (isLoading){
        return <div>Page is Loading</div>
    }

    if(isError){
        return <div>Error has occured... {error.message}</div>
    }

    const {title, body} = data?.data || {};


  return (
    <div className='container'>
        <h3>{title}</h3>
        <p>{body}</p>
    </div>
  )
}

export default ReactQueryById