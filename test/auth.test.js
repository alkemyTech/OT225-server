let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

const { User } = require('../models');

const app = require('../app');

/**
 * Testing POST users endpoint
 */

describe('User authentication', () => {
    before(async () => {
        await User.destroy({ truncate: true, cascade: true, force: true })
    })
    // REGISTER
    it('responds with status 400 if a field is missing', (done) => {
        chai.request(app)
            .post('/auth/register')
            .send({ email: 'test@test.com', firstName: 'Carlos', password: 'test1234' })
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('responds with status 201 if the user was created successfully', (done) => {
        chai.request(app)
            .post('/auth/register')
            .send({ email: 'test@test.com', firstName: 'Carlos', lastName: "Perez", password: 'test1234' })
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(201);
                if (err) return done(err);
                done();
            });
    });
    it('responds with status 400 if user just exists', (done) => {
        chai.request(app)
            .post('/auth/register')
            .send({ email: 'test@test.com', firstName: 'Carlos', lastName: "Perez", password: 'test1234' })
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(400);
                if (err) return done(err);
                done();
            });
    });

    // LOGIN
    it('responds with status 400 if a field is missing', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({ password: 'test1234' })
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('responds with status 200 if user login successfully', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({ email: 'test@test.com', password: 'test1234' })
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200);
                if (err) return done(err);
                done();
            });
    });
    it('responds with status 400 if user NOT exists', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({ email: 'test1@test.com', password: 'test1234' })
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('responds with status 401 if wrong password', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({ email: 'test@test.com', password: 'test12345' })
            .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(401);
                if (err) return done(err);
                done();
            });
    });
});
