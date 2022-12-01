const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle" }] });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "PostTitle");
        done();
        // console.log(user);
      });
  });

  it("Can add subdocuments to an existing record", (done) => {
    // create joe, save joe, fetch joe, add a post, save joe, fetch joe, make assertion
    const joe = new User({
      name: "Joe",
      posts: [],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        // add new record to subdocument collection, post to joe
        user.posts.push({ title: "New Post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "New Post");
        done();
      });
  });

  // 50.
  it("can remove an existing subdocument", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "New Title" }],
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        // 50. calling remove on the post, we still need to call save on the Model
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() =>
        User.findOne({ name: "Joe" }).then((user) => {
          assert(user.posts.length === 0);
          done();
        })
      );
  });
});
