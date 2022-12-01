const mongoose = require("mongoose");

// 27. reference to ES6 Promise implementation
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/users_test");
  mongoose.connection
    .once("open", () => {
      // console.log("Serving on localhost 27017");
      done();
    })
    .on("error", (error) => {
      console.warn("Warning:", error);
    });
});

// VIDEO 25.
beforeEach((done) => {
  // drop all records before each test is run
  mongoose.connection.collections.users.deleteMany(() => {
    // ready to run next test!
    done();
  });
});
