const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

const { Testimonials } = require('../models');
console.log(Testimonials);

//Testing the testimonials route
describe("testimonials", () => {
    before(async () => {
        await Testimonials.destroy({
            where: {},
            truncate: true,
            force: true,
            restartIdentity: true
        })
    })
    it("POST responds with status 201 if the testimonial was created successfully", async () => {
        const res = await chai.request(app)
            .post("/testimonies")
            .set('Authorization', process.env.TOKEN)
            .send({
                name: "Testimonial",
                content: "Testimonial content",
                image: "Testimonial image"
            })
        expect(res.status).to.equal(201);
    });
    it("POST responds with status 400 if there is a missing field", async () => {
        const res = await chai.request(app)
            .post("/testimonies")
            .set('Authorization', process.env.TOKEN)
            .send({
                name: "Testimonial",
                content: "Testimonial content"
            })
        expect(res.status).to.equal(400);
    });
    it("GET responds with status 200 if the requested page exists", async () => {
        const res = await chai.request(app)
            .get("/testimonies?page=1")
            .set('Authorization', process.env.TOKEN)
        expect(res.status).to.equal(200);
    });
    it("GET responds with status 400 if the requested page does not exist", async () => {
        const res = await chai.request(app)
            .get("/testimonies?page=2")
            .set('Authorization', process.env.TOKEN)
        expect(res.status).to.equal(400);
    });
    it("GET responds with status 400 if it does not receive a page", async () => {
        const res = await chai.request(app)
            .get("/testimonies")
            .set('Authorization', process.env.TOKEN)
        expect(res.status).to.equal(400);
    });
    it("PUT responds with status 200 if the testimonial name was updated successfully", async () => {
        const res = await chai.request(app)
            .put("/testimonies/1")
            .set('Authorization', process.env.TOKEN)
            .send({
                name: "Testimonial updated"
            })
        expect(res.status).to.equal(200);
        const data = await Testimonials.findOne({
            where: {
                id: 1
            }
        })
        expect(data.name).to.equal("Testimonial updated");
    })
    it("PUT responds with status 200 if the testimonial content was updated successfully", async () => {
        const res = await chai.request(app)
            .put("/testimonies/1")
            .set('Authorization', process.env.TOKEN)
            .send({
                content: "Testimonial content updated"
            })
        expect(res.status).to.equal(200);
        const data = await Testimonials.findOne({
            where: {
                id: 1
            }
        })
        expect(data.content).to.equal("Testimonial content updated");
    })
    it("PUT responds with status 200 if the testimonial image was updated successfully", async () => {
        const res = await chai.request(app)
            .put("/testimonies/1")
            .set('Authorization', process.env.TOKEN)
            .send({
                image: "Testimonial image updated"
            })
        expect(res.status).to.equal(200);
        const data = await Testimonials.findOne({
            where: {
                id: 1
            }
        })
        expect(data.image).to.equal("Testimonial image updated");
    })
    it("PUT responds with status 200 if all fields of testimonial was updated succesfully", async () => {
        const res = await chai.request(app)
            .put("/testimonies/1")
            .set('Authorization', process.env.TOKEN)
            .send({
                name: "Testimonial updated two",
                content: "Testimonial content updated two",
                image: "Testimonial image updated two"
            })
        expect(res.status).to.equal(200);
        const data = await Testimonials.findOne({
            where: {
                id: 1
            }
        })
        expect(data.name).to.equal("Testimonial updated two");
        expect(data.content).to.equal("Testimonial content updated two");
        expect(data.image).to.equal("Testimonial image updated two");
    })
    it("PUT responds with status 404 if the testimonial does not exist", async () => {
        const res = await chai.request(app)
            .put("/testimonies/2")
            .set('Authorization', process.env.TOKEN)
            .send({
                name: "Testimonial updated",
                content: "Testimonial content updated",
                image: "Testimonial image updated"
            })
        expect(res.status).to.equal(404);
    })
    it("PUT responds with status 400 if the fields are invalid", async () => {
        const res = await chai.request(app)
            .put("/testimonies/1")
            .set('Authorization', process.env.TOKEN)
            .send({
                invalidField: "invalid"
            })
        expect(res.status).to.equal(400);
    })
    it("PUT responds with status 404 if id is not a number", async () => {
        const res = await chai.request(app)
            .put("/testimonies/test")
            .set('Authorization', process.env.TOKEN)
            .send({
                name: "Testimonial updated",
                content: "Testimonial content updated",
                image: "Testimonial image updated",
            })
        expect(res.status).to.equal(404);
    })
    it("DELETE responds with status 200 if the testimonial was deleted successfully", async () => {
        const res = await chai.request(app)
            .delete("/testimonies/1")
            .set('Authorization', process.env.TOKEN)
        expect(res.status).to.equal(200);
        const data = await Testimonials.findOne({
            where: {
                id: 1
            }
        })
        expect(data).to.equal(null);
    })
    it("DELETE responds with status 404 if the testimonial does not exist", async () => {
        const res = await chai.request(app)
            .delete("/testimonies/2")
            .set('Authorization', process.env.TOKEN)
        expect(res.status).to.equal(404);
    })
})







