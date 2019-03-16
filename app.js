const express = require('express');
const memjs = require('memjs');

const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
const mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,
  timeout: 1,
  keepAlive: true
});
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
    if (isNaN(number) || number < 1 || number > 10000) {
      res.render('index', { error: 'Please submit a valid number between 1 and 10000' });
      return;
    }
    req.query.n = number;
  }
  next();
};

app.get('/', validate, async (req, res) => {
  const n = req.query.n;
  const primeKey = `prime.${n}`;
  let prime;
  let renderProps;
  let useCached = true;
  
  if (n) {
    prime = await mc.get(primeKey);
    if (!prime) {
      prime = await mc.set(primeKey, calculatePrime(n));
      useCached = false;
    }
    renderProps = { n, prime: parseInt(prime), useCached };
  } else {
    renderProps = {};
  }

  const renderProps = n ? { n, prime: calculatePrime(n) } : {};
  res.render('index', renderProps);
});

app.listen(port, err => {
  console.log('Listening on port' + port);
});
