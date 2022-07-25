const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

/* Test the GET Route */
describe("GET /contacts", () => {
  it("Debe devolver una lista de las novedades", (done) => {
    chai
      .request(app)
      .get("/contacts")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });
});