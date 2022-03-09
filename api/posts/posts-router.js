const express = require('express')

const Post = require('./posts-model')
const router = express.Router()

router.get('/', (req, res)=> {
    Post.find()
    .then(found => {
        res.json(found)
    })
    .catch(err => {
        res.status(500).json({
            message:"the post info cannot be retrieved",
            err: err.message,
            stack: err.stack,
    })
})
})

router.get('/:id', async (req, res)=> {
    try{
        const post = await Post.findById(req.params.id)
        if(!post) {
            res.status(404).json({
                message:" the post with the id does not exist",
            })
    } else{
        res.json(post)
    }
    } catch(err){
        res.status(500).json({
            message:"the post info cannot be retrieved",
            err: err.message,
            stack: err.stack,
        })
    }
})

router.post('/', (req, res)=> {
    const { title, contents } =  req.body
    if(!title || !contents){
        res.status(400).json({
            message:" please provided title and contents for the post"
        })
    } else{
        Post.insert({ title, contents})
        .then(({ id }) => {
            return Post.findById(id)
            
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message:"theres was an error while saving post to the DB",
                err: err.message,
                stack: err.stack,
            })
        })
    }
    
})
module.exports = router;