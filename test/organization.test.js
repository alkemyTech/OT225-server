const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

const { Organization, Slides, User, sequelize } = require("../models");

describe("organization", () => {
    let authorization;
    before(async () => {
        await Organization.destroy({
            where: {},
            truncate: { cascade: true },
            force: true,
        });
        await Slides.destroy({
            where: {},
            truncate: { cascade: true },
            force: true,
        });
        await sequelize.query("ALTER TABLE organizations AUTO_INCREMENT = 1");
        await sequelize.query("ALTER TABLE slides AUTO_INCREMENT = 1");
        await Organization.create({
            name: "Organization",
            image: "Organization image",
            address: "Organization Adress",
            phone: 12,
            email: "organization@org.com",
            welcomeText: "Organization WelcomeText",
            aboutUsText: "Organization AboutUsText",
            url_facebook: "Organization FacebookURL",
            url_linkedin: "Organization LinkedInURL",
            url_instagram: "Organization InstagramURL"
        });
        await Organization.create({
            name: "Organization 2",
            image: "Organization 2 image",
            address: "Organization 2 Adress",
            phone: 123,
            email: "organization2@org.com",
            welcomeText: "Organization 2 WelcomeText",
            aboutUsText: "Organization 2 AboutUsText",
            url_facebook: "Organization 2 FacebookURL",
            url_linkedin: "Organization 2 LinkedInURL",
            url_instagram: "Organization 2 InstagramURL"
        });
        await Slides.create({
            imageUrl: "Slide image",
            text: "Slide text",
            order: 1,
            organizationId: 1
        });

        await chai.request(app).post("/auth/register").send({
            email: "testinguser@testinguser.com",
            password: "testing.123",
            firstName: "Testing",
            lastName: "User"
        });
        await User.update({
            roleId: 1
        }, {
            where: {
                email: "testinguser@testinguser.com"
            }
        });
        const res = await chai.request(app).post("/auth/login").send({
            email: "testinguser@testinguser.com",
            password: "testing.123"
        });
        authorization = res.body.token;
        });

    it("GET /public responds with status 200 and an array of organizations", async () => {
        const res = await chai.request(app).get("/organization/public");
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an("array");
    });

    it("GET /public/:id responds with status 200 and an array of slide", async () => {
        const res = await chai.request(app).get("/organization/public/1");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    it("PUT /public/:id responds with status 200 and update the organization when a field is submitted", async () => {
        const res = await chai.request(app).put("/organization/public/1").set("Authorization", `bearer ${authorization}`).send({
            name: "Organization updated",
        });
        expect(res.status).to.equal(200);
        const data = await Organization.findByPk(1);
        expect(data.name).to.equal("Organization updated");
    });

    it("PUT /public/:id responds with status 200 and update the organization when all fields are submitted", async () => {
        const res = await chai.request(app).put("/organization/public/1").set("Authorization", `bearer ${authorization}`).send({
            name: "Organization name updated",
            image: "Organization image updated",
            address: "Organization address updated",
            email: "emailUpdated@test.com",
            phone: 123456789,
            welcomeText: "Organization welcome text updated",
            aboutUsText: "Organization about us text updated"
        });
        expect(res.status).to.equal(200);
        const organization = await Organization.findByPk(1);
        expect(organization.name).to.equal("Organization name updated");
        expect(organization.image).to.equal("Organization image updated");
        expect(organization.address).to.equal("Organization address updated");
        expect(organization.email).to.equal("emailUpdated@test.com");
        expect(organization.welcomeText).to.equal("Organization welcome text updated");
        expect(organization.aboutUsText).to.equal("Organization about us text updated");
    });

    it("PUT /public/:id responds with status 400 if there is a missing field", async () => {
        const res = await chai.request(app).put("/organization/public/1").set("Authorization", `bearer ${authorization}`).send({});
        expect(res.status).to.equal(400);
    });
});
