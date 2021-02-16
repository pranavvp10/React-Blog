import React, {useState, useEffect} from 'react';
import CreatePost from './components/CreatePost';
import ShowPost from './components/ShowPost';
import UpdatePost from './components/UpdatePost';

const App = () => {

  const [posts, setPosts] = useState([])
  const [newpost, setNewpost] = useState(false)
  const [editpost, setEditpost] = useState(false)
  const [editid,setEditid]=useState(null)




  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(res => setPosts(res))
  }, [])
  
  const delPost = (id) => {
    fetch(`http://localhost:5000/api/posts/${id}`, { method: 'DELETE' })
      .then(() => console.log(`${id} deleted`))
    .then(window.location.reload())
  }

  const newPost = (id) => {
    setNewpost(!newpost)
  }

  const editPost = (id) => {
    setEditpost(!editpost)
    setEditid(id)
  }



  // console.log(posts)

  if (newpost) {
    return (
    <CreatePost />
  )
  }
  else if (editpost) {
    const idToedit= editid
    return (
      <UpdatePost id={idToedit}/>
    )
  }


  else {
    return (
      <div className="container">
        <div className="text-center"><button onClick={newPost} className="btn btn-success text-white m-2">Create Post</button></div>
        <div className="col-md-12">
            
          {
            posts.map((post) => (
              <div key={post.id} className="m-2">
                <ShowPost
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  date={post.created_at}
                  body={post.body}
                  delPost={delPost}
                  editPost={editPost}
                />
              </div>
            ))
          }
        </div>
      </div>
      
    )
}

  
}


export default App;
