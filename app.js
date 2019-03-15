const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const router = express.Router();

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

const validate = function(req, res, next) {
  if (req.query.n) {
    const number = parseInt(req.query.n, 10);
    if (isNaN(number) || number < 1 || number ? 10000) {
      res.render('index', { error: 'Please submit a valid number between 1 and 10000' });
      return;
    }
    req.query.n = number;
  }
  next();
};

router.get('/', validate, (req, res) => {
  const renderProps = req.query.n ? { n: req.query.n, prime: prime } : {};
  res.render('index', renderProps);
});

app.use('/', router);

app.listen(port, err => {
  console.log('Listening on port' + port);
});
