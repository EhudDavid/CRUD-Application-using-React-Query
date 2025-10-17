import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import RegularFetch from './components/RegularFetch'
import './App.css'
import ReactQueryFetch from './components/ReactQueryFetch'
import ReactQueryFetchByclick from './components/ReactQueryFetchByclick'
import ReactQueryById from './components/ReactQueryById'
import PaginateQueries from './components/PaginateQueries'
import InfiniteQueries from './components/InfiniteQueries'
import InfiniteQueriesScroll from './components/InfiniteQueriesScroll'
import UseQueriesDemo from './components/UseQueriesDemo'

function App() {
  

  return (
    <>
      <BrowserRouter>
            <nav className='navbar'>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/regular">Regular Fetch</NavLink>
              <NavLink to="/react-query">React query fetch</NavLink>
              <NavLink to="/react-click"> fetching by click</NavLink>
              <NavLink to='/react-paginated'>Pagination</NavLink>
              <NavLink to="/react-infinite">Infinite scroll-1</NavLink>
              <NavLink to="/react-infinite-scroll">Infinite scroll-2</NavLink>
              <NavLink to="/react-usequery">UseQueries</NavLink>
            </nav>

            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/regular' element={<RegularFetch/>}/>
              <Route path='/react-query' element={<ReactQueryFetch/>}/>
              <Route path='/react-query/:postId' element={<ReactQueryById/>}/>
              <Route path='/react-click' element={<ReactQueryFetchByclick/>}/>
              <Route path='/react-paginated' element={<PaginateQueries/>}/>
              <Route path='/react-infinite' element={<InfiniteQueries/>}/>
              <Route path='/react-infinite-scroll' element={<InfiniteQueriesScroll/>}/>
              <Route path='/react-usequery' element={<UseQueriesDemo/>}/>
            </Routes>
      </BrowserRouter>   
    </>
  )
}

export default App
