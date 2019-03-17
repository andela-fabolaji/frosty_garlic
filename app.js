const express = require('express');
const bodyParser = require('body-parser');
const mc = require('./utils/memcached');
const validate = require('./middlewares/validate');
const PrimeCtrl = require('./controllers/prime');
const cacheView = require('./middlewares/cacheView');
const likes = require('./utils/likes');

const app = express();
const port = process.env.PORT || 4000;
app.set('view engine', 'ejs');

// use middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route
app.get('/', validate, cacheView, PrimeCtrl);
app.post('/', (req, res) => {
  mc.delete(`_view_cache_/?n=${req.body.n}`, (err, val) => {});
  likes[req.query.n] = (likes[req.query.n] || 0) + 1;
  res.redirect(`/?n=${req.query.n}`);
});

// start
app.listen(port, err => console.log('Listening on port' + port));
