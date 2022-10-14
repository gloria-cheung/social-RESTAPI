const router = require("express").Router();
const Post = require("../models/Post");

// create a post
router.post("/", async (req, res, next) => {
  // check to see if body has userId since its required
  if (req.body.userId) {
    try {
      // create new post with all the data from body
      const post = new Post(req.body);
      const savedPost = await post.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("need userId associated with making new post");
  }
});
// update a post

// delete a post
router.delete("/:id", async (req, res, next) => {
  try {
    // find post and check whether userId matches the user whos trying to delete
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("you can only delete your own posts");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// like a post
// get a post
// get timeline posts (all posts of user's followings)

router.get("/", (req, res, next) => {
  res.send("post route");
});

module.exports = router;
