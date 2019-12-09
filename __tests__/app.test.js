require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const connect = require('../lib/utils/connect.js');
const app = require('../lib/app');
const Band = require('../Band.js');
const mongoose = require('mongoose');

describe('application routes', () => {
  it('has a home route that says hello everyone', () => {

    beforeAll(() => {
      connect();
    });

    afterAll(() => {
      return mongoose.connection.close();
    });

    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ text: 'hello' });
      });
  });
  it('has a post route', () => {
    return request(app)
      .post('/bands')
      .send({
        name: 'Black Sabbath',
        drums: 'Bill Ward',
        bass: 'Geezer Butler',
        guitar: 'Toni Iommi',
        canCountToFour: true
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          name: 'Black Sabbath',
          drums: 'Bill Ward',
          bass: 'Geezer Butler',
          guitar: 'Toni Iommi',
          canCountToFour: true
        });
      });
  });
  it('has a get route to find one band by id', async() => {
    const band = await Band.create({
      name: 'Black Sabbath',
      drums: 'Bill Ward',
      bass: 'Geezer Butler',
      guitar: 'Toni Iommi',
      canCountToFour: true
    });
    return request(app)
      .get(`/${band._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          name: 'Black Sabbath',
          drums: 'Bill Ward',
          bass: 'Geezer Butler',
          guitar: 'Toni Iommi',
          canCountToFour: true
        });
      });
  });
  it('has a get route to update one band by id', async() => {
    const band = await Band.create({
      name: 'Black Sabbath',
      drums: 'Bill Ward',
      bass: 'Geezer Butler',
      guitar: 'Toni Iommi',
      canCountToFour: true
    });
    return request(app)
      .put(`/count/${band._id}/update`)
      .then(res => {
        expect(res.body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          name: 'Black Sabbath',
          drums: 'Bill Ward',
          bass: 'Geezer Butler',
          guitar: 'Toni Iommi',
          canCountToFour: false
        });
      });
  });
  it('can find all bands', async() => {
    return request(app)
      .get('/bands')
      .then(res => {
        expect(res.body[0]).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          name: 'Black Sabbath',
          drums: 'Bill Ward',
          bass: 'Geezer Butler',
          guitar: 'Toni Iommi',
          canCountToFour: true
        });
      });
  });
  it('can delete a band', async() => {
    const band = await Band.create({
      name: 'Black Sabbath Too',
      drums: 'Bill Ward',
      bass: 'Geezer Butler',
      guitar: 'Toni Iommi',
      canCountToFour: true
    });
    return request(app)
      .put(`/delete/${band._id}/delete`)
      .then(res => {
        expect(res.body).toEqual({
         
        });
      });
  });
 
});
