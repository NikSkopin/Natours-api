const fs = require('fs');
const express = require('express');

const app = express();

//read info about all tours from json
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000; //TODO env variable or config file for port

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
