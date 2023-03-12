const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel, productModel } = require('../../../src/models');

const { sales, newSale, salesById, idSale, newSaleInsert, productQuantityById, products, itemsUpdated } = require('./mocks/sale.service.mock');

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

  describe('Atualização de uma venda', function () {
    it('retorna um erro caso não receba uma quantidade de produto', async function () {
      const saleId = 1;
      const sale = { productId: 2, quantity: '' };
      sinon.stub(saleModel, 'findById').resolves(1, '');
      const result = await saleService.updateSale(saleId, sale);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"value" must be of type object');
    });

    it('retorna um erro caso não encontre o venda', async function () {
      const saleId = 9999;
      const sale = { productId: 2, quantity: '' };
      sinon.stub(saleModel, 'findById').resolves(undefined);
      const result = await saleService.updateSale(saleId, sale);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('deve retornar o status 200 e o venda alterada em caso de sucesso', async function () {
      // const saleId = 1;
      // const sale = [{ productId: 1, quantity: 5 }];
      // sinon.stub(saleModel, 'update').resolves(saleId);
      // sinon.stub(saleModel, 'findById').resolves(salesById[0]);
      // const result = await saleService.updateSale(saleId, sale);
      // expect(result.type).to.equal(null);
      // expect(result.message).to.deep.equal(itemsUpdated);
    });
  });

  describe('Remoção de um venda', function () {
    it('retorna um erro caso receba um parâmetro inválido', async function () {
      const result = await saleService.deleteSale('a');
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso não encontre o venda', async function () {
      sinon.stub(saleModel, 'findById').resolves(undefined);
      sinon.stub(saleModel, 'deleteSale').resolves(undefined);
      const result = await saleService.deleteSale(9999);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('não deve retornar o mensagem e/ou tipo em caso de sucesso', async function () {
      sinon.stub(saleModel, 'findById').resolves(sales[0]);
      sinon.stub(saleModel, 'deleteSale').resolves(1);
      const result = await saleService.deleteSale(1); 
      expect(result.type).to.equal(null); 
      expect(result.message).to.equal(''); 
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });