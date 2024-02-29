const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/surah', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Definisikan skema dan model untuk "visited surah"
const visitedSurahSchema = new mongoose.Schema({
  name: String
});

const VisitedSurah = mongoose.model('VisitedSurah', visitedSurahSchema);

// Endpoint untuk menyimpan "visited surah" ke database
app.post('/api/visited-surah', (req, res) => {
  const { name } = req.body;

  const visitedSurah = new VisitedSurah({ name });
  visitedSurah.save()
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.error('Error saving visited surah:', error);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});