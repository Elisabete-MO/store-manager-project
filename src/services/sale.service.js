const { saleModel, productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const validateProductId = async (sale) => {
  const response = await Promise.all(sale.map(async (dados) => {
    const { productId } = dados;
    const product = await productModel.findById(productId);
    if (!product) return false;
    return true;
  }));
  return response.every((value) => value);
};

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await saleModel.findById(saleId);
  if (!sale || sale === undefined) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

const createSale = async (sale) => {
  const error = schema.validateNewSale(sale);
  if (error.type) return error;
  const response = await validateProductId(sale);
  if (!response) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const newSaleId = await saleModel.insert(sale);
  const newSale = await saleModel.findSalesProductById(newSaleId);
  return { type: null, message: newSale };
};

module.exports = {
  findAll,
  findById,
  createSale,
};