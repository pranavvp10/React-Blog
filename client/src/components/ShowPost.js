import React from 'react'
import './ShowPost.css'

export const ShowPost = ({id,title,description,date,body,delPost,editPost}) => {
    return (
        <div className="postItem">
            <h1 className="text-primary">{title}</h1>
            <p className="text-secondary">{ date}</p>
            <h5 className="text-secondary">{description}</h5>
            <p className="postbody">{body}</p>
            <hr />
            <button className="btn rounded btn-danger mr-2" onClick={() => delPost(id)}>Delete</button>
            <button className="btn rounded btn-info mr-2" onClick={()=>editPost(id)}>Edit</button>
        </div>
    )
}

export default ShowPost;
