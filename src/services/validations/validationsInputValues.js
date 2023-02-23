const { idSchema, nameSchema, createSaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) { 
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: '' };
};

const validateNewSale = async (sale) => { 
  const { error } = createSaleSchema.validate(sale);
  if (error) { 
    return { type: 'INVALID_VALUE', message: error.message };
  }
  return { type: null, message: '' };
};

// const validateInputValues = async ({ travelId, driverId }) => {
//   /* Valida se travelId existe */
//   const travel = await travelModel.findById(travelId);
//   if (!travel) return { type: 'TRAVEL_NOT_FOUND', message: 'travel id not found' };

//   /* Valida se driverId existe */
//   const driver = await driverModel.findById(driverId);
//   if (!driver) return { type: 'DRIVER_NOT_FOUND', message: 'driver id not found' };

//   return { type: null, message: '' };
// };

// const validateRequestTravelSchema = (passengerId, startingAddress, endingAddress, waypoints) => {
//   const { error } = addRequestTravelSchema
//     .validate({ passengerId, startingAddress, endingAddress, waypoints });
//   if (error) return { type: 'INVALID_VALUE', message: error.message };

//   return { type: null, message: '' };
// };

// const validateAlreadyDriver = async (travelId) => {
//   const travel = await travelModel.findById(travelId);

//   if (travel && travel.driverId) {
//     return { type: 'TRAVEL_CONFLICT', message: 'travel already assigned' };
//   }

//   return { type: null, message: '' };
// };

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
  // validateRequestTravelSchema,
  // validateInputValues,
  // validateAlreadyDriver,
};