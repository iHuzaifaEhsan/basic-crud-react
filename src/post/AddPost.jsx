import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseURL, endPoints } from '../constants/url';

const AddPost = () => {

  const { id } = useParams()
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    let allFields = {
      titleKey: title,
      bodyKey: body
    }
    if (window?.location?.pathname === '/add-post') {
      try {
        fetch(`${baseURL}/${endPoints.posts}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allFields),
        })
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        fetch(`${baseURL}/${endPoints.posts}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(allFields)
        })
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getDataById = async () => {
    try {
      const res = await fetch(`${baseURL}/${endPoints.posts}/${id}`, {})
      const result = await res.json()
      setTitle(result?.title)
      setBody(result?.body)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataById()
  }, [])

  return (
    <>
      <h1>{window?.location?.pathname === '/add-post' ? 'Add Post' : "Edit Post"}</h1><br />
      {"Title: "}<br />
      {title}<br /><br />
      {"Body: "}<br />
      {body}<br /><br />
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label>Title</label><br />
          <input placeholder='Title here...' value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
        </div>
        <div className='form-control'>
          <label>Body</label><br />
          <textarea placeholder='Body here...' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        </div>
        <br />
        <button type='submit'>{window?.location?.pathname === '/add-post' ? "Submit" : "Update"}</button>
      </form>
    </>
  )
}

export default AddPost