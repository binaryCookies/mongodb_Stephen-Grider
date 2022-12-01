const mongoose = require("mongoose");
const PostSchema = require("./post");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: "String",
    required: [true, "Name is required."],

    // 44.
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters",
    },
  },

  posts: [PostSchema],
  // 54.
  likes: Number,
});

UserSchema.virtual("postCount").get(function () {
  // 53.
  // console.log("Hi");
  return this.posts.length;
});

// create user following the UserSchema
// User represents the collection
const User = mongoose.model("user", UserSchema);

module.exports = User;
