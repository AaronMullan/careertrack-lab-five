const express = require('express');
const app = express();
const Band = require('../Band.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ text: 'hello' });
});
app.post('/bands', (req, res) => {
  const {
    name, 
    drums, 
    bass, 
    guitar, 
    canCountToFour 
  } = req.body;
  Band
    .create({ name, drums, bass, guitar, canCountToFour })
    .then(newBand => {
      console.log('created band', newBand); 
      res.send(newBand);
    });
});
app.get('/bands', (req, res) => {
  Band
    .find()
    .then(foundBands => {
      res.send(foundBands);
    });
});
app.get('/:id', (req, res) => {
  const BandId = req.params.id;
  Band.findById(BandId)
    .then(foundBand => {
      res.send(foundBand);
    });
});
app.put('/count/:id/update', (req, res) => {
  const bandId = req.params.id;
  Band.findByIdAndUpdate(bandId,
    { canCountToFour: false },
    { new: true })
    .then(foundBand => {
      res.send(foundBand);
    });
});

app.delete('/delete/:id/delete', (req, res) => {
  const BandId = req.params.id;
  Band.findById(BandId)
    .then(foundBand => {
      res.send(foundBand);
    })
    .then(Band.findByIdAndDelete(Band)
    );
});

module.exports = app;
