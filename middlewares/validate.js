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

module.exports = validate;