const assert = require("assert");
const { isTypedArray } = require("util/types");
const User = require("../src/user");

// 37.
describe("Updating records", () => {
  let joe;

  beforeEach((done) => {
    // 54. defaut the like to zero
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => done());
  });

  // We assert the name Alex here and save/update with the different methods below
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
    // .catch((err) => console.error(err));
  }

  // 38. Changed to object over json which dint workW
  it("instance type using set n save", (done) => {
    joe.set({ name: "bob" });
    // console.log(joe);
    assertName(joe.save(), done());
  });

  //38.
  it("A model instance can update", (done) => {
    assertName(joe.updateOne({ name: "Alex" }), done);
  });

  // 39.
  it("A model class can update", (done) => {
    assertName(User.updateMany({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("A model class can update one record", (done) => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("A model class can find a record with an ID and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });

  // 41. increment update operator
  // 54. changing postCount to likes
  it("A user can have their postcount incremented by one", (done) => {
    // every user to get one added to postcount
    User.updateOne({ name: "Joe" }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        // console.log(user);
        assert(user.likes === 10);
        done();
      });
  });
});
