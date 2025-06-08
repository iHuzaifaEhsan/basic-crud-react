import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Posts from './post/Posts'
import AddPost from './post/AddPost'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/edit-post/:id' element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App