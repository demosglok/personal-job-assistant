module.exports = function(req, res, next) {
  if(req.user) {
    next();
  } else {
    throw new Error('Not authorized');
  }
};
