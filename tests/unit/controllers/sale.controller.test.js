const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { sales, invalidValue, newSale, salesById, salesUpdated } = require('./mocks/sale.controller.mock');

describe('Teste de unidade do controller de vendas (sale)', function () {
  describe('Recuperando a lista de vendas', function () {
    it('Deve retornar o status 200 e a lista de vendas', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findAll')
        .resolves({ type: null, message: sales });
      await saleController.listSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });
  });

  describe('Busca de uma venda', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const res = {};
      const req = { params: { id: invalidValue }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number'  });
      await saleController.getSale(req, res);
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('retorna um erro caso a venda não exista', async function () {
      const res = {};
      const req = { params: { id: 9999 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      await saleController.getSale(req, res);
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('deve retornar o status 200 e a venda em caso de sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: null, message: salesById });
      await saleController.getSale(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesById);
    });
  });
  
  describe('Cadastro de uma venda', function () {
    it('retorna um erro caso não receba um ID de produto', async function () {
      const res = {};
      const req = { body: { productId: '' }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSale')
        .resolves({ type: 'DATA_REQUIRED', message: '"product_Id" is required'  });
      await saleController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: '"product_Id" is required' });
    });

    it('retorna um erro caso não receba uma quantidade de produto', async function () {
      const res = {};
      const req = { body: { quantity: '' }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSale')
        .resolves({ type: 'DATA_REQUIRED', message: '"quantity" is required'  });
      await saleController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('retorna um erro caso receba uma quantidade igual ou inferior a 0', async function () {
      const res = {};
      const req = { body: { quantity: 0 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSale')
        .resolves({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });
      await saleController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('deve retornar o status 201 e o venda em caso de sucesso', async function () {
      const res = {};
      const req = { body: { newSale }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSale')
        .resolves({ type: null, message: salesById });
      await saleController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(salesById);
    });
  });

  describe('Atualização de uma venda', function () {
    it('retorna um erro caso não receba uma quantidade de produto', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { productId: 1, quantity: '' }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'updateSale')
        .resolves({ type: 'DATA_REQUIRED', message: '"quantity" is required' });
      await saleController.updateSale(req, res);
      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('retorna um erro caso não encontre a venda', async function () {
      const res = {};
      const req = { params: { id: invalidValue }, body: { productId: 1, quantity: 5 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'updateSale')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      await saleController.updateSale(req, res);
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('deve retornar o status 200 e a venda alterada em caso de sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { productId: 1, quantity: 10 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'updateSale')
        .resolves({ type: null, message: salesUpdated });
      await saleController.updateSale(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesUpdated);
    });
  });

  describe('Remoção de uma venda', function () {
    it('retorna um erro caso receba um parâmetro inválido', async function () {
      const res = {};
      const req = { params: { id: invalidValue }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'deleteSale')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });
      await saleController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('retorna um erro caso não encontre a venda', async function () {
      const res = {};
      const req = { params: { id: 9999 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'deleteSale')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      await saleController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('deve retornar o status 204 em caso de sucesso', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub()
      };
      const req = { params: { id: 1 }, };
      sinon
        .stub(saleService, 'deleteSale')
        .resolves({ type: null, message: '' });
      await saleController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledOnce;
    });  
  });

  afterEach(function () {
    sinon.restore();
  });
});