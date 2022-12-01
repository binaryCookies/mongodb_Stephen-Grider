const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("requires a user name", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync().errors.name.message;
    // const validationResult = user.validateSync()
    // const { message } = validationResult.errors.name;

    // console.log(validationResult);

    assert(validationResult === "Name is required.");
  });

  it("requires a user name longer than 2 characters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name must be longer than 2 characters");
  });

  it("disallows invalid records from being saved", (done) => {
    const user = new User({ name: "Al" });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === "Name must be longer than 2 characters");
      done();
    });
  });
});

// describe("Validating records", () => {
//   it("requires a user name", () => {
//     const user = new User({ name: undefined });
//     const validationResult = user.validateSync();
//     const { message } = validationResult.errors.name;
//     // console.log(message);
//     assert(message === "Name is required.");
//   });

//   it("requires a user's name longer than 2 characters", () => {
//     const user = new User({ name: "Al" });
//     const validationResult = user.validateSync();
//     // console.log(validationResult);
//     const { message } = validationResult.errors.name;
//     // console.log(message);
//     // The message comes from the UserSchema validator object
//     assert(message === "Name must be longer than 2 characters");
//   });
//   //   45. Handling failed inserts
//   it("disallows invalid record from being saved", (done) => {
//     const user = new User({ name: "Al" });
//     user.save().catch((validationResult) => {
//       const { message } = validationResult.errors.name;
//       assert(message === "Name must be longer than 2 characters");
//       done();
//     });
//   });
// });
