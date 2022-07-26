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

/* Test the POST route */
describe("POST /contacts", () => {
  it("Debe crear un nuevo contacto", (done) => {
    const contacts = {
      name: "testeo",
      phone: 123,
      email: "testeo@testeo.com",
      message: "testeo",
    };
    chai
      .request(app)
      .post("/contacts")
      .set('Authorization', process.env.TOKEN)
      .send(contacts)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });
  it("Debe devolver un error 400, por datos erroneos", (done) => {
    const contacts = {};
    chai
      .request(app)
      .post("/contacts")
      .set('Authorization', process.env.TOKEN)
      .send(contacts)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
});