const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(5).required();

const createSaleSchema = Joi.object({
  productId: idSchema,
  quantity: Joi.number().integer().min(1).required(),
});

// const pointSchema = Joi.string().min(3).required();

// const waypointSchema = Joi.object({
//   address: pointSchema,
//   stopOrder: Joi.number().integer().min(1) });

// const addRequestTravelSchema = Joi.object({
//   passengerId: idSchema,
//   startingAddress: pointSchema,
//   endingAddress: pointSchema.invalid(Joi.ref('startingAddress')),
//   waypoints: Joi.array().items(waypointSchema),
// });

module.exports = {
  idSchema,
  nameSchema,
  createSaleSchema,
  // addPassengerSchema,
  // addRequestTravelSchema,
};