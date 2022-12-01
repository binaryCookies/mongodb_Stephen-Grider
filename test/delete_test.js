const assert = require("assert");
const User = require("../src/user");

// 33. Write test using Mocha
describe("Deleting a User", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  // instance method
  it("model instance remove", (done) => {
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  // 33. Below 3 it blocks will use User
  it("class method remove, deleteOne", (done) => {
    // Remove a bunch of records with some given criteriea
    User.deleteOne({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class method findAndRemove", () => {
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class method findByIdAndRemove", (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
