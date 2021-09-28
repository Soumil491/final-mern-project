const chai = require('chai');
const chaiHttp = require('chai-http');
const restaurantApp = require('../server.js');

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Unit testing the /register route', () => {
    it('it should return OK status', (done) => {
        let user = {
            firstName: 'abc',
            lastName: 'xyz',
            email: 'abd1234ssasa@g.com',
            password: 'stunt bi'
        }
        chai.request(restaurantApp)
            .post('/register')
            .send(user)
            .end((_err, response) => {
                response.should.have.status(201);
            done();
            })
    });
});