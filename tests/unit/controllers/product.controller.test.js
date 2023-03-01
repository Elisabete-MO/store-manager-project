const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { products, invalidValue, validName, newProduct } = require('./mocks/product.controller.mock');

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

  describe('Busca de um produto pelo ID', function () {
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
  });

  describe('Busca de um produto pelo nome', function () {
    it('retorna um erro caso o produto não exista', async function () {
      const res = {};
      const req = { query: { name: invalidValue }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findByName')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productController.getByNameProduct(req, res);
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('deve retornar o status 200 e o produto caso exista', async function () {
      const res = {};
      const req = { query: { name: validName }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findByName')
        .resolves({ type: null, message: products[0] });
      await productController.getByNameProduct(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });
  });
  
  describe('Cadastro de um produto', function () {
    it('retorna um erro caso não receba um nome de produto', async function () {
      const res = {};
      const req = { body: { name: '' }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: 'DATA_REQUIRED', message: '"name" is required'  });
      await productController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('retorna um erro caso receba um nome com menos de 5 caracteres', async function () {
      const res = {};
      const req = { body: { name: invalidValue }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      await productController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('deve retornar o status 201 e o produto em caso de sucesso', async function () {
      const res = {};
      const req = { body: { name: validName }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'createProduct')
        .resolves({ type: null, message: newProduct });
      await productController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });

  describe('Atualização de um produto', function () {
    it('retorna um erro caso não receba um nome de produto', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: '' }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'updateProduct')
        .resolves({ type: 'DATA_REQUIRED', message: '"name" is required' });
      await productController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('retorna um erro caso não encontre o produto', async function () {
      const res = {};
      const req = { params: { id: invalidValue }, body: { name: validName }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'updateProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('deve retornar o status 200 e o produto em caso de sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: validName }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'updateProduct')
        .resolves({ type: null, message: newProduct });
      await productController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });

  describe('Remoção de um produto', function () {
    it('retorna um erro caso receba um parâmetro inválido', async function () {
      const res = {};
      const req = { params: { id: invalidValue }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'deleteProduct')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
      await productController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('retorna um erro caso não encontre o produto', async function () {
      const res = {};
      const req = { params: { id: 9999 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'deleteProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await productController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('deve retornar o status 204 em caso de sucesso', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub()
      };
      const req = { params: { id: 1 }, };
      sinon
        .stub(productService, 'deleteProduct')
        .resolves({ type: null, message: '' });
      await productController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledOnce;
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
