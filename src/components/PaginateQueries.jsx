import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'

const fetchItems = (pageNumber) => {
    return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageNumber}`)
}

const PaginateQueries = () => {

    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["items", page],
        queryFn: () => fetchItems(page),
        keepPreviousData: true,
    })

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }


    return (
        <>
            <div className='container'>
                <h1>Pagination Example</h1>
                <div className='items'>
                    {Array.isArray(data?.data) ? data.data.map((item) => {
                        return <div key={item.id} className='item'>{item.name}</div>
                    }) : null}
                </div>
                <button className='btn-pagination'
                onClick={() => {
                    setPage((prev) => prev - 1)
                }}
                disabled={page == 1 ? true : false}
                >Previous</button>

                {Array.from({length:10}, (_, i) => i + 1).map((pageNumber) => (
                    <button 
                    style={{
                        fontWeight: page === pageNumber ? "bold" : "normal"
                    }}
                    disabled={page === pageNumber} key={pageNumber} className='btn-pagination' onClick={() => setPage(pageNumber)}>{pageNumber}</button>
                ))}

                <button 
                className='btn-pagination'
                onClick={() => {
                    setPage((prev) => prev + 1)
                }}
                disabled={page == 10? true: false}
                >Next</button>

            
            </div>
        </>
    )
}

export default PaginateQueries