const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel, productModel } = require('../../../src/models');

const { sales, newSale, salesById, idSale, newSaleInsert, productQuantityById, products } = require('./mocks/sale.service.mock');

describe('Teste de unidade do service de vendas (sale)', function () {
  describe('Recuperando a lista de vendas', function () {
    it('Deve retornar a lista de vendas', async function () {
      sinon.stub(saleModel, 'findAll').resolves(sales);
      const result = await saleService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(sales);
    });
  });

  describe('Busca de uma venda', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await saleService.findById('a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso a venda não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves(undefined);
      const result = await saleService.findById(9999);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
    
    it('deve retornar a venda em caso de sucesso', async function () {
      sinon.stub(saleModel, 'findById').resolves(salesById);
      const result = await saleService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(salesById);
    });
  });

  describe('Cadastro de uma venda', function () {
    // it('retorna um erro caso receba um ID inválido', async function () {
    //   sinon.stub(schema, 'validateNewSale').returns({ type: 'INVALID_PRODUCT_ID', message: 'Invalid product id' });
    //   const result = await saleService.createSale(idSale);
    //   expect(result.type).to.equal('INVALID_VALUE');
    //   expect(result.message).to.equal('"id" must be a number');
    // });

    it('retorna um erro caso não encontre um produto', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const result = await saleService.createSale(idSale);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('deve retornar a venda em caso de sucesso', async function () {
      sinon.stub(productModel, 'findById').resolves(products);
      sinon.stub(saleModel, 'insert').resolves(1);
      sinon.stub(saleModel, 'findSalesProductById').resolves(productQuantityById);
      const result = await saleService.createSale(newSale);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newSaleInsert);
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });