const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

/* Test the GET Route */
describe("GET /members", () => {
  it("Debe devolver una lista de los miembros", (done) => {
    chai
      .request(app)
      .get("/members")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
});

/* Test the POST route */
describe("POST /members", () => {
  it("Debe crear un nuevo miembro", (done) => {
    const member = {
      name: "testeo",
      image: "testeo",
    };
    chai
      .request(app)
      .post("/members")
      .set("Authorization", process.env.TOKEN)
      .send(member)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });
  it("Debe devolver un error 400, por datos erroneos", (done) => {
    const member = {
      content: "testeo",
    };
    chai
      .request(app)
      .post("/members")
      .set("Authorization", process.env.TOKEN)
      .send(member)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
});
it("Debe dar un error 401, no autorizado", (done) => {
  const member = {
    name: "testeo",
    image: "testeo",
  };
  chai
    .request(app)
    .post("/members")
    .send(member)
    .end((err, response) => {
      response.should.have.status(401);
      done();
    });
});
/* Test the PUT route */
describe("PUT /members/:id", () => {
  it("Debe actualizar un miembro por Id", (done) => {
    const member = {
      name: "testeo",
    };
    const id = 1;
    chai
      .request(app)
      .put(`/members/${id}`)
      .set("Authorization", process.env.TOKEN)
      .send(member)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("Debe dar un error 400, datos ingresados incorrectamente", (done) => {
    const member = {};
    const id = 1;
    chai
      .request(app)
      .put(`/members/${id}`)
      .set("Authorization", process.env.TOKEN)
      .send(member)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it("Debe dar un error 404, no se encontro el miembro", (done) => {
    const member = {
      name: "testeo",
    };
    const id = 99999;
    chai
      .request(app)
      .put(`/member/${id}`)
      .set("Authorization", process.env.TOKEN)
      .send(member)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
it("Debe dar un error 401, no autorizado", (done) => {
  const member = {
    name: "testeo",
  };
  const id = 1;
  chai
    .request(app)
    .put(`/members/${id}`)
    .send(member)
    .end((err, response) => {
      response.should.have.status(401);
      done();
    });
});

/* Test the DELETE route */
describe("DELETE /members/:id", () => {
  it("Debe eliminar un miembro por id", (done) => {
    id = 7;
    chai
      .request(app)
      .delete(`/members/${id}}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("Debe devolver 404, no se encontro el miembro a eliminar", (done) => {
    const id = 123456;
    chai
      .request(app)
      .delete(`/members/${id}`)
      .set("Authorization", process.env.TOKEN)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
  it("Debe dar un error 401, no autorizado", (done) => {
    id = 7;
    chai
      .request(app)
      .delete(`/members/${id}}`)
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
});
