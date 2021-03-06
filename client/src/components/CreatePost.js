import React, { useState } from 'react';

export const CreatePost = () => {
  const [values, setValues] = useState({
    title: '',
  description: '',
    body: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleTitle = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      title: event.target.value,
    }));
  };

  const handleDescription = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      description: event.target.value,
    }));
  };

  const handleBody = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      body: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        created_at: new Date().toLocaleDateString(),
        body:values.body
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  })

    setSubmitted(true);
    };
  

  if (submitted) {
    window.location.reload();
  }
    
  return (
    <>
      <form onSubmit={handleSubmit} className="m-3">
        <legend className="text-primary font-weight-bolder">Create New Post</legend>
        <div className="form-group">
          <label className="p-2">Title</label>
          <input
          id="title"
          className="form-control"
          type="text"
          placeholder="title"
          name="title"
            value={values.title}
            onChange={handleTitle}
          />
       </div>

        <div className="form-group">
          <label className="p-2" for="description">Description</label>
          <input
            id="description"
            className="form-control"
            type="text"
            placeholder="description"
            name="description"
            value={values.description}
            onChange={handleDescription}
          />
        </div>

        <div className="form-group">
          <label className="p-2">Post</label>
          <textarea
            cols="60"
            rows="8"
            id="body"
            className="form-control"
            type="text"
            placeholder="post"
            name="body"
            value={values.body}
            onChange={handleBody}
          ></textarea>
        </div>

        <button className="btn rounded btn-primary" type="submit">Post</button>
        <button className="btn rounded btn-warning text-dark m-2" type="button" onClick={()=>{window.location.reload()}}>Cancel</button>
      </form>
    </>
  )
}

export default CreatePost;
