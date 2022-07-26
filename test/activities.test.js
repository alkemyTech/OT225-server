const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);


//Test the Activities POST route
describe("POST /activities", () => {
  it("Responds with status 201 if the activity was successfully created ", (done) => {
    const activities = {
      name: "testeo",
      content: "testeo",
      image: "testeo"
    };
    chai
      .request(app)
      .post("/activities")
      .set('Authorization', process.env.TOKEN)
      .send(activities)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });
  it("Responds with status 400 if a field is missing", (done) => {
    const activities = {
      content: "testeo",
      image: "testeo"
    };
    chai
      .request(app)
      .post("/activities")
      .set('Authorization', process.env.TOKEN)
      .send(activities)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it("Responds with status 401, Unauthorized ", (done) => {
    const activities = {
      name: "testeo",
      content: "testeo",
      image: "testeo"
    };
    chai
      .request(app)
      .post("/activities")
      .send(activities)
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
});

//Test the Activities PUT route */
describe("PUT /activities/:id", () => {
  it("Responds with status 200 if the activities was successfully updated", (done) => {
    const activities = {
      name: "testeo",
    };
    const id = 8;
    chai
      .request(app)
      .put(`/activities/${id}`)
      .send(activities)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("Responds with status 400 if a field is incorrect", (done) => {
    const activities = {};
    const id = 8;
    chai
      .request(app)
      .put(`/activities/${id}`)
      .send(activities)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it("Responds with status 404 if the activitie doesn't exist", (done) => {
    const activities = {
      name: "testeo",
    };
    const id = 999999999999999;
    chai
      .request(app)
      .put(`/activities/${id}`)
      .send(activities)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});