const assert= require('assert');
const expect = require('expect');
const request = require('supertest');
const restaurantApp = require('../server.js');

describe('Unit testing the /getListOfPlaces route', () => {
    it('/getListOfPlaces should return OK status', () => {
        return request(restaurantApp)
            .get('/getListOfPlaces')
            .then(response => {
                assert.equal(response.status, 200)
            })
            .catch(err => {console.error(err)});
    });
});