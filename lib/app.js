const express = require('express');
const app = express();
const band = require('../Band.js');

app.use(express.json());

app.post('/hello', (req, res) => {
  res.send(req.body);
});
  

app.get('/', (req, res) => {
  res.send({ text: 'hello' });
});

async function crudMethod() {
  const createdBand = await band.create({
    name: 'The Beatles',
    drums: 'Ringo',
    canCountToFour: true
  });
  const getBand = await band.findById(createdBand._id);

  const getAllBands = await band.find();

  const updateBand = await band.findByIdAndUpdate(getBand._id, { bass: 'Paul McCartney' }, { new: true });

  const deleteBand = await band.findByIdAndDelete(getBand._id);
}


module.exports = app;
