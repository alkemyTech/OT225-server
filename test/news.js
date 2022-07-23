const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

/* Test the GET Route */
describe("GET /news", () => {
  it("Debe devolver una lista de las novedades", (done) => {
    chai
      .request(app)
      .get("/news")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });
});
/* Test the POST route */
describe("POST /news", () => {
  it("Debe crear una nueva novedades", (done) => {
    const news = {
      name: "testeo",
      content: "testeo",
      image: "testeo",
      categoryId: 1,
    };
    chai
      .request(app)
      .post("/news")
      .send(news)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });
  it("Debe devolver un error 400, por datos erroneos", (done) => {
    const news = {
      content: "testeo",
      image: "testeo",
      categoryId: 1,
    };
    chai
      .request(app)
      .post("/news")
      .send(news)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
});
/* Test the PUT route */
describe("PUT /news/:id", () => {
  it("Debe actualizar una novedad por Id", (done) => {
    const news = {
      name: "testeo",
    };
    const id = 8;
    chai
      .request(app)
      .put(`/news/${id}`)
      .send(news)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("Debe dar un error 400, datos ingresados incorrectamente", (done) => {
    const news = {};
    const id = 8;
    chai
      .request(app)
      .put(`/news/${id}`)
      .send(news)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it("Debe dar un error 404, no se encontro la novedad", (done) => {
    const news = {
      name: "testeo",
    };
    const id = 1;
    chai
      .request(app)
      .put(`/news/${id}`)
      .send(news)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
/* Test the DELETE route */
describe("DELETE /news/:id", () => {
  it("Debe eliminar una novedad por id", (done) => {
    const id = 21;
    chai
      .request(app)
      .delete(`/news/${id}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("Debe devolver 404, no se encontro la novedad a eliminar", (done) => {
    const id = 123456;
    chai
      .request(app)
      .delete(`/news/${id}`)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

/* Test the GET (by id) route */

describe("GET /news/:id/comments", () => {
  it("Debe devolver la lista de comentarios de una novedad", (done) => {
    const id = 8;
    chai
      .request(app)
      .get(`/news/${id}/comments`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });

  it("Debe dar un error 404 al no encontrar la novedad", (done) => {
    const id = 1;
    chai
      .request(app)
      .get(`/news/${id}/comments`)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
  it("Debe dar un error 404 a la novedad no tener comentarios", (done) => {
    const id = 11;
    chai
      .request(app)
      .get(`/news/${id}/comments`)
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
