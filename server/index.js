const express = require('express');
const app = express();
const port = process.env.PORT||5000;
const Joi = require('joi');
const cors = require('cors');
const { required } = require('joi/lib/types/lazy');

app.use(cors());
app.use(express.json());

const posts=[{id:1,title:'Title 1', description:'description of post 1',created_at:new Date().toLocaleDateString(), body:'body part of the the post 1. '},
             {id:2,title:'Title 2', description:'description of post 2',created_at:new Date().toLocaleDateString(), body:'body part of the the post 2. '},
             {id:3,title:'Title 3', description:'description of post 3',created_at:new Date().toLocaleDateString(), body:'body part of the the post 3. '}
            ];

// root
app.get('/api', (req, res) => res.send('welcome to blog API'));

// get all posts
app.get('/api/posts', (req, res) => {
  res.send(posts);
});

//query a specific post by id 
app.get('/api/posts/:id', (req, res) => {
  let post = posts.find(post => post.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");


  res.send(post);
});

// create new post
app.post('/api/posts', (req, res) => {
  const { error } = validatePost(req.body);
  
  if (error) return res.status(400).send(error.details[0].message);

  const post = {
    id: posts.length + 1,
    title: req.body.title,
    description: req.body.description,
    created_at:req.body.created_at,
    body: req.body.body
  };

  posts.push(post);
  res.send(post);
});

//update a post by specifying is id 
app.put('/api/posts/:id', (req, res) => {
  let post = posts.find(post => post.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");

  const { error } = validatePost(req.body);
  
  if (error) return res.status(400).send(error.details[0].message);

  post.id = post.id;
  post.title = req.body.title;
  post.description = req.body.description;
  post.created_at= post.created_at;
  post.body = req.body.body;

  res.send(post);
});

// deletes a post
app.delete('/api/posts/:id', (req, res) => {
  let post = posts.find(post => post.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");


  const index = posts.indexOf(post);
  posts.splice(index, 1);

  res.send(post);
});

app.listen(port, () => console.log(`listening on ${port}!`));

// validation of post
const validatePost = (post) => {
  
  const schema = {
    title: Joi.string().min(5).required(),
    description: Joi.string().max(50).required(),
    created_at:Joi.date(),
    body: Joi.string().max(2000).required()
  };

  return Joi.validate(post, schema);

};


