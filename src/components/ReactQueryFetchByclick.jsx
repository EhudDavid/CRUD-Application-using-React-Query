import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchPosts = () => {
  return axios.get("http://localhost:3001/posts")
}

const ReactQueryFetchByclick = () => {
  const {data, isLoading, isFetching, error, isError, refetch} = useQuery({
    queryKey:['posts'],
    queryFn: () => fetchPosts(),
    enabled: false,
    staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  retry: 3,
  retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  placeholderData: [{ id: 0, title: 'Loading placeholder...' }],
  keepPreviousData: true,
  onSuccess: (data) => console.log(" Success:", data),
  onError: (err) => console.error(" Error:", err),
  onSettled: () => console.log("Query finished"),
  })

  // When enabled:false the query is idle until refetch is called.
  if (!data && !isFetching && !isError) {
    return (
      <div className="container">
        <h1>React Query fetch</h1>
        <p>Click "Load data" to fetch posts.</p>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Loading…' : 'Load data'}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container">
        <h1>React Query fetch</h1>
        <p>Initial load…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container">
        <h1>React Query fetch</h1>
        <p>error in fetching data: {error?.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  // Safely map over data if present
  const posts = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="container">
      <h1>React Query fetch</h1>

      <ul className="posts">
        {posts.map((post) => (
          <li className="post" key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>

      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Loading…' : 'Load data'}
      </button>
    </div>
  );
}

export default ReactQueryFetchByclick