const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { products, invalidValue, validName } = require('./mocks/product.controller.mock');

describe('Teste de unidade do controller de produtos', function () {
  describe('Recuperando a lista de produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: products });
      await productController.listProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const res = {};
      const req = { params: { id: invalidValue }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number'  });
      await productController.getProduct(req, res);
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('retorna um erro caso o produto não exista', async function () {
      const res = {};
      const req = { params: { id: 9999 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productController.getProduct(req, res);
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  it('deve retornar o status 200 e o produto caso exista', async function () {
    const res = {};
    const req = { params: { id: 1 }, };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findById')
      .resolves({ type: null, message: products[0] });
    await productController.getProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});