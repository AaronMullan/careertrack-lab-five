const request = require('supertest');
const app = require('../lib/app');

describe('application routes', () => {
  it('has a home route that says hello everyone', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ text: 'hello' });
      });
  });
});
