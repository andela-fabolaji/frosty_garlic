const mc = require('../utils/memcached');
const calcPrime = require('../utils/prime');
const likes = require('../utils/likes');

const PrimeController = (req, res) => {
  const n = req.query.n;
  const primeKey = `prime.${n}`;
  let prime;
  let useCached = true;

  if (n) {
    mc.get(primeKey, (err, val) => {
      if (!err && val) {
        prime = parseInt(val);
      } else {
        useCached = false;
        prime = calcPrime(n);
        mc.set(primeKey, `${prime}`, { expires: 0 }, (err, data) => {});
      }
      res.render('index', {
        n,
        prime: parseInt(prime),
        useCached,
        likes: likes[req.query.n] || 0                                                                    
      });
    });
  } else {
    res.render('index', {});
  }
};

module.exports = PrimeController; 