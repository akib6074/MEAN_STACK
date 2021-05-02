const express = require("express");
const Post = require('../models/post');

const router = express.Router();

//max pass:hPSsWi06z1uWr86V
router.post("", (req, res, _next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    //post.save automatically generate query that mongoose does
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post added successfully",
            postID: createdPost._id
        });
    });
});

router.put("/:id", (req,res,_next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(_result => {
        res.status(200).json({message: "Updated successfully!"});
    });
});

router.get("", (_req, res, _next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: documents
        });
    });
});

router.get("/:id", (req, res, _next) => {
    Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post not found!"});
        }
    });
});

router.delete("/:id", (req, res, _next) => {
    Post.deleteOne({ _id: req.params.id}).then(results => {
        console.log(results);
        res.status(200).json({message: "Post deleted!"});
    });
});

module.exports = router;