const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { sales, invalidValue, validName, newSale } = require('./mocks/sale.controller.mock');

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
        .resolves({ type: null, message: sales[0] });
      await saleController.getSale(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales[0]);
    });
  });
  
  describe('Cadastro de uma venda', function () {
    it('retorna um erro caso não receba um nome de venda', async function () {
      const res = {};
      const req = { body: { name: '' }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSale')
        .resolves({ type: 'DATA_REQUIRED', message: '"name" is required'  });
      await saleController.createSale(req, res);
      console.log(res.status);
      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('retorna um erro caso receba um nome com menos de 5 caracteres', async function () {
      const res = {};
      const req = { body: { name: invalidValue }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSale')
        .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
      await saleController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('deve retornar o status 201 e o venda em caso de sucesso', async function () {
      const res = {};
      const req = { body: { name: validName }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'createSale')
        .resolves({ type: null, message: newSale });
      await saleController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});