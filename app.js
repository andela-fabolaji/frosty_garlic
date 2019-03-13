const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');

const calculatePrime = n => {
  let prime = 1;
  for (let i = n; i > 1; i--) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      prime = i;
      break;
    }
  }
  return prime;
};

app.get('/', (req, res) => {
  const renderProps = req.query.n ? { n: req.query.n, prime: prime } : {};
  res.render('index', renderProps);
});

app.listen(port, err => {
  console.log('Listening on port' + port);
});
