const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res, next) => {
  // check to see if user is updating own account or is an admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // if password is inputted, need to hash before saving to db
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err.message);
      }
    }

    // update the user with data (eg: desc, profilePicture, followers, etc)
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json("you can only update your own account");
  }
});

//delete user
router.delete("/:id", async (req, res, next) => {
  // check to see if user is updating own account or is an admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user deleted");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you can only delete your own account");
  }
});
//get a user
//follow a user
//unfollow a user

router.get("/", (req, res, next) => {
  res.send("user route");
});

module.exports = router;
