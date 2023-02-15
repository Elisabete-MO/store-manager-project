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
  if (!product || product === undefined) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

// const createproduct = async (name, email, phone) => {
//   const error = schema.validateNewproduct(name, email, phone);
//   if (error.type) return error;

//   const newproductId = await productModel.insert({ name, email, phone });
//   const newproduct = await productModel.findById(newproductId);

//   return { type: null, message: newproduct };
// };

// const productExists = async (productId) => {
//   const product = await productModel.findById(productId);
//   if (product) return true;
//   return false;
// };

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
  // createproduct,
  // requestTravel,
};