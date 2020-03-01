const request = require('supertest');
const app = require('../../index');

describe('POST api/v1/users/login', function() {

  it('it should login success', (done) => {
    let mockup = {
      "email": "test@exaple.com",
      "password":"demotest"
    }

    request(app)
      .post('/api/v1/users/login')
      .send(mockup)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect('{"clientName":"Demo Test 01"}')
      .end((err, res) => {
        if (err) return done(err);
        done();
      });

  });

});
