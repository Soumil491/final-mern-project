const chai = require('chai');
const chaiHttp = require('chai-http');
const restaurantApp = require('../server.js');

//Assertion
chai.should();
chai.use(chaiHttp);

describe('Unit testing the /submitQuery route', () => {
    it('it should return OK status', (done) => {
        let booking = {
            firstName: 'abc',
            lastName: 'xyz',
            mobileNo: 6380805410,
            query: 150
        }
        chai.request(restaurantApp)
            .post('/submitQuery')
            .send(booking)
            .end((_err, response) => {
                response.should.have.status(200);
            done();
            })
    });
});