const assert = require("assert");

// User represents the whole collection in our db
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", (done) => {
    // make an assertion inside test file
    // assert(1 + 1 === 2);

    // Step 1) create user
    const joe = new User({ name: "Joe" });

    // Step 2) save record
    joe.save().then(() => {
      // Is joe saved successfully?
      assert(!joe.isNew);
      done();
    });
  });
});
