import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'


const fetchPosts = () => {
  return axios.get("http://localhost:3001/posts")
}

const ReactQueryFetch = () => {
  const {data, isLoading, isFetching, error, isError} = useQuery({
    queryKey:['posts'],
    queryFn: () => fetchPosts(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
    refetchOnMount:false
    
  })

  if (isLoading){
    return <p>Please wait while Loaading</p>
  }

  if (isError){
    return <p>error in fetching data:{error.message}</p>
  }

  // console.log(data)
  console.log("isLoading :", isLoading)
  console.log("isFetching", isFetching)
  const posts = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className='container'>
        <h1>React Query fetch</h1>

        <ul className='posts'>
          {posts.map((post) => (
            <li className='post' key={post.id}>
              <Link to={`/react-query/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default ReactQueryFetch