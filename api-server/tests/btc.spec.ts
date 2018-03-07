var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('btc unit tests:', () => {
    it('Should create a btc instance', (done: Function) => {
        api.post('/btcs').send({}).expect(200, done);
    });
});
