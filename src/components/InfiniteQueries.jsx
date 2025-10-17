import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


const fetchItems = ({pageParam}) => {
    return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageParam}`)
}


const InfiniteQueries = () => {
    const {data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey:['items'],
        queryFn: fetchItems,
        initialPageParam: 1,
        getNextPageParam:(lastpage, allpages) => {
            if(allpages.length<10){
                return allpages.length + 1
            }
            else{
                return undefined;
            }
        }
    })

    if(isLoading){
        return <div>Page is Loading...</div>
    }

    if(isError){
        return <div>Error has occured...{error.message}</div>
    }

    console.log(data)
  return (
    <div className='container'>
        <h1>Infinite Queries</h1>
                <div className='item'>
                        {Array.isArray(data?.pages) ? data.pages.flatMap(page => (
                            Array.isArray(page.data) ? page.data.map(item => (
                                <div key={item.id} className='items'>{item.name}</div>
                            )) : []
                        )) : null}
                </div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>Load More</button>
    </div>
  )
}

export default InfiniteQueries