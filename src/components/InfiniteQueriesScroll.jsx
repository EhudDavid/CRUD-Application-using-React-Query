import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'

const fetchItems = ({pageParam}) => {
    return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageParam}`)
}


const InfiniteQueriesScroll = () => {
  const {data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
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


    const {ref, inView} = useInView();
    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView])


    if(isLoading){
        return <div>Page is Loading...</div>
    }

    if(isError){
        return <div>Error has occured...{error.message}</div>
    }

    console.log(data)
  return (
    <div className='container'>
        <h1>Infinite Queries Scroll</h1>
                <div className='item'>
                        {Array.isArray(data?.pages) ? data.pages.flatMap(page => (
                            Array.isArray(page.data) ? page.data.map(item => (
                                <div key={item.id} className='items'>{item.name}</div>
                            )) : []
                        )) : null}
                </div>
        <div ref={ref}>{isFetching?"Loading..." : "No more"}</div>
    </div>
  )
}

export default InfiniteQueriesScroll