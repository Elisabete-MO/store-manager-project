const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (!product || product === undefined) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;
  const newProductId = await productModel.insert({ name });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const findId = await findById(id);
  if (findId.type) return findId;
  const respName = schema.validateNewProduct(name);
  if (respName.type) return respName;

  await productModel.update(id, name);
  const updatedProduct = await productModel.findById(id);

  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  const findId = await findById(id);
  if (findId.type) return findId;

  await productModel.deleteProduct(id);

  return { type: null, message: '' };
};

// const saveWaypoints = (waypoints, travelId) => {
//   if (waypoints && waypoints.length > 0) {
//     return waypoints.map(async (value) => {
//       await waypointModel.insert({
//         address: value.address,
//         stopOrder: value.stopOrder,
//         travelId,
//       });
//     });
//   }

//   return [];
// };

// const requestTravel = async (productId, startingAddress, endingAddress, waypoints) => {
//   const validationResult = schema.validateRequestTravelSchema(
//     productId,
//     startingAddress,
//     endingAddress,
//     waypoints,
//   );

//   if (validationResult.type) return validationResult;

//   if (await productExists(productId)) {
//       const travelId = await travelModel.insert({
//           productId,
//           startingAddress,
//           endingAddress,
//       });

//       await Promise.all(saveWaypoints(waypoints, travelId));
//       const travel = await travelModel.findById(travelId);
//       return { type: null, message: travel };
//   }
// };

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};