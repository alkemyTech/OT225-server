const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

/* Test the GET Route */
describe("GET /users", () => {
  it("Debe devolver un objecto con todos usuarios", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
});