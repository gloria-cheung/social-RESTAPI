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
router.put("/:id", async (req, res, next) => {
  try {
    // find post and check whether userId matches the user whos trying to update
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("post updated");
    } else {
      res.status(403).json("you can only update your own posts");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

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

// like or dislike a post
router.put("/:id/like", async (req, res, next) => {
  try {
    // find post
    const post = await Post.findById(req.params.id);
    const currentUser = req.body.userId;

    // check when user already liked this post
    if (!post.likes.includes(currentUser)) {
      // add current user to post's likes array
      await Post.findByIdAndUpdate(req.params.id, {
        $push: { likes: currentUser },
      });
      res.status(200).json("user liked this post");
    } else {
      // remove current user from post's likes array
      await Post.findByIdAndUpdate(req.params.id, {
        $pull: { likes: currentUser },
      });
      res.status(200).json("user disliked this post");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get a post
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.send(403).json("no post was found");
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get timeline posts (all posts of user's followings)

router.get("/", (req, res, next) => {
  res.send("post route");
});

module.exports = router;
