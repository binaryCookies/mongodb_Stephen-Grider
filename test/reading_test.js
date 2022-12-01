const assert = require("assert");

const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });
  it("finds all users with a name of joe", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      // console.log(joe._id, users[0]._id);

      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a user with a particular id", (done) => {
    // User.find({}).then((users) => console.log(users));
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "Joe");
      done();
    });
  });
});

// describe("Reading users out of the database", () => {
//   let joe;
//   beforeEach((done) => {
//     joe = new User({ name: "Joe" });
//     joe.save().then(() => done());
//   });
//* async...await
//   it("finds all users with a name of joe", async () => {
//     const users = await User.find({ name: "Joe" });
//     console.log(users);
//   });
// });
