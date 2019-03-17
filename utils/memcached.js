const memjs = require('memjs');

const mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,
  timeout: 1,
  keepAlive: true
});

module.exports = mc;