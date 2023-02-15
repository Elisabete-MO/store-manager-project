const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

// const createProduct = async (req, res) => {
//   const { name, email, phone } = req.body;
  
//   const { type, message } = await productService.createproduct(name, email, phone);

//   if (type) return res.status(errorMap.mapError(type)).json(message);

//   res.status(201).json(message);
// };

// const createTravel = async (req, res) => {
//   const { productId } = req.params;
//   const { startingAddress, endingAddress, waypoints } = req.body;

//   const { type, message } = await productService.requestTravel(
//     productId,
//     startingAddress,
//     endingAddress,
//     waypoints,
//   );

//   if (type) return res.status(errorMap.mapError(type)).json({ message });

//   res.status(201).json(message);
// };

module.exports = {
  listProducts,
  getProduct,
  // createProduct,
  // createTravel,
};