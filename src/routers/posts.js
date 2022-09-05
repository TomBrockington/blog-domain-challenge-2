const express = require('express')
const {
    createPost,
    getPostsById,
    updatePostById,
} = require('../controllers/posts')

const router = express.Router()

router.post("/:id/posts", createPost)
router.get("/:id/posts", getPostsById)
router.put("/:id/posts/:id", updatePostById)


module.exports = router