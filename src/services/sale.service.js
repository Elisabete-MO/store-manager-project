const { saleModel, productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const validateProductId = async (sale) => {
  // Caso o produto não seja encontrado, a função retorna false para a sua respectiva posição no array response. Caso o produto seja encontrado, a função retorna true. Ao final da iteração, a função verifica se todos os valores no array response são true, usando a função every, e retorna true se todos os valores forem true ou false caso contrário.
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
  if (!sale || sale === undefined || sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

const createSale = async (sale) => {
  let newSale = { id: '', itemsSold: '' };
  const { productId, quantity } = sale;
  const error = schema.validateNewSale(productId, quantity);
  if (error.type) return error;
  const response = await validateProductId(sale);
  if (!response) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const newSaleId = await saleModel.insert(sale);
  const sales = await saleModel.findSalesProductById(newSaleId);
  newSale = {
    id: newSaleId,
    itemsSold: sales,
  };
  return { type: null, message: newSale };
};

const deleteSale = async (id) => {
  const findId = await findById(id);
  if (findId.type) return findId; 
  await saleModel.deleteSale(id);

  return { type: null, message: '' };
};

const updateSale = async (saleId, sale) => {
  let responseSale = { saleId: '', itemsUpdate: '' };
  const { productId, quantity } = sale;
  const response = await findById(saleId);
  if (response.type) return response;
  const error = schema.validateNewSale(productId, quantity);
  if (error.type) return error;
  const validateProduct = await validateProductId(sale); 
  if (!validateProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await saleModel.update(saleId, sale);
  const sales = await saleModel.findSalesProductById(saleId);
  responseSale = {
    saleId,
    itemsUpdated: sales,
  };
  return { type: null, message: responseSale };
};

module.exports = {
  findAll,
  findById,
  createSale,
  deleteSale,
  updateSale,
};