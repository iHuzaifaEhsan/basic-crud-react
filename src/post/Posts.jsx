import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Posts = () => {

  const navigate = useNavigate()

  const [postData, setpostData] = useState([])
  console.log(postData)
  const getPost = async () => {
    try {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", { method: "GET" })
      const result = await data.json()
      if (result) {
        setpostData(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = (id) => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tilte</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            postData && postData.map((item) => {
              return (
                <tr key={item?.id}>
                  <td>{item?.id}</td>
                  <td>{item?.title}</td>
                  <td>{item?.body}</td>
                  <button onClick={() => navigate(`/edit-post/${item?.id}`)}>EDIT</button>
                  <button onClick={() => handleDelete(item?.id)}>DELETE</button>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default Posts