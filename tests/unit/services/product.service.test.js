const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const {products, invalidValue, validName } = require('./mocks/product.service.mock');

describe('Verificando service de produtos', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(products);
      const result = await productService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await productService.findById('a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const result = await productService.findById(1);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna o produto caso exista', async function () {
      sinon.stub(productModel, 'findById').resolves(products[0]);
      const result = await productService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });