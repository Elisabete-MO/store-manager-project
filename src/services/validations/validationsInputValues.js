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

const validateNewSale = (sale) => { 
  const { error } = createSaleSchema.validate(sale);
  if (error) { 
    return { type: 'INVALID_VALUE', message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
};