const router = require("express").Router();
const Post = require("../models/Post");

// create a post
router.post("/", async (req, res, next) => {
  if (req.body.userId) {
    try {
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
// like a post
// get a post
// get timeline posts (all posts of user's followings)

router.get("/", (req, res, next) => {
  res.send("post route");
});

module.exports = router;
