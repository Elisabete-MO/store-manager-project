module.exports = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: '"id" is required' });
  }
console.log(typeof id);
  return next();
};
