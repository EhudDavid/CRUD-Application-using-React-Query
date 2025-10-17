import { useQueries } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'


const fetchPostById = async(id) =>{
    const response = await axios.get(`http://localhost:3001/posts/${id}`);
    return response.data;
};

const MultiplePosts = ({postIds}) => {
    const postQueries = useQueries({
        queries: postIds.map((id) => ({
            queryKey:["posts", id],
            queryFn : () => fetchPostById(id)
        }))
    })

    const isLoading = postQueries.some((query) => query.isLoading)
    const hasError = postQueries.some((query) => query.isError)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (hasError) {
        return <div>One or more posts failed to load.</div>
    }

    return (
        <div className='posts'>
            <h5>Post Details</h5>
            {postQueries.map((query, index) => (
                <div className='post' key={index}>
                    <h4>{query.data?.id}.{query.data?.title}</h4>
                    <p>{query.data?.body}</p>
                </div>
            ))}
        </div>
    )
}


const UseQueriesDemo = () => {
    const postIds = [1,4,5,6,8];

  return (
    <div className='container'>
        <h1>UseQueries</h1>
        <MultiplePosts postIds={postIds}/>
    </div>
  ) 
}

export default UseQueriesDemo