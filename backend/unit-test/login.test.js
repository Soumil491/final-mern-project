const chai = require('chai');
const chaiHttp = require('chai-http');
const restaurantApp = require('../server.js');

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Unit testing the /login route', () => {
    it('it should return OK status', (done) => {
        let cred = {
            email: 'ss1234@gmail.com',
            password: 'stunt bike'
        }
        chai.request(restaurantApp)
            .post('/login')
            .send(cred)
            .end((_err, response) => {
                response.should.have.status(200);
            done();
            })
    });
});