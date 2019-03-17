const mc = require('../utils/memcached');

const cacheView = (req, res, next) => {
  const viewKey = `_view_cache_${req.originalUrl || req.url}`;
  mc.get(viewKey, (err, val) => {
    if (!err && val) {
      return res.send(val.toString('utf8'));
    }

    res.sendRes = res.send;
    res.send = body => {
      mc.set(viewKey, body, { expires: 0 }, (err, val) => {});
      res.sendRes(body);
    };
    next();
  });  
};

module.exports = cacheView;