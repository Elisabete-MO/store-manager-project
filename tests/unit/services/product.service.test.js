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

  describe('Busca de um produto pelo ID', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      const result = await productService.findById(invalidValue);
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

  describe('Busca de um produto pelo nome', function () {
    it('retorna um erro caso o produto não exista', async function () {
      sinon.stub(productModel, 'findByName').resolves(undefined);
      const result = await productService.findByName(invalidValue);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna o produto caso exista', async function () {
      sinon.stub(productModel, 'findByName').resolves(products[3]);
      const result = await productService.findByName(validName);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[3]);
    });
  });

  describe('Cadastro de um produto', function () {
    it('retorna um erro caso receba um nome com menos de 5 caracteres', async function () {
      const result = await productService.createProduct(invalidValue);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
    
    it('deve retornar o produto em caso de sucesso', async function () {
      sinon.stub(productModel, 'insert').resolves(5);
      sinon.stub(productModel, 'findById').resolves(products[3]);
      const result = await productService.createProduct(validName);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[3]);
    });
  });
  
  describe('Atualização de um produto', function () {
    it('retorna um erro caso não receba um nome de produto', async function () {
      sinon.stub(productModel, 'findById').resolves(1, '');
      const result = await productService.updateProduct(1);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('retorna um erro caso não encontre o produto', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      sinon.stub(productModel, 'update').resolves(undefined);
      const result = await productService.updateProduct(9999);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('deve retornar o status 200 e o produto em caso de sucesso', async function () {
      sinon.stub(productModel, 'update').resolves(5);
      sinon.stub(productModel, 'findById').resolves(products[3]);
      const result = await productService.updateProduct(1, validName);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[3]);
    });
  });

  describe('Remoção de um produto', function () {
    it('retorna um erro caso receba um parâmetro inválido', async function () {
      const result = await productService.deleteProduct(invalidValue);
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso não encontre o produto', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      sinon.stub(productModel, 'deleteProduct').resolves(undefined);
      const result = await productService.deleteProduct(9999);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('não deve retornar o mensagem e/ou tipo em caso de sucesso', async function () {
      sinon.stub(productModel, 'findById').resolves(products[3]);
      sinon.stub(productModel, 'deleteProduct').resolves(5);
      const result = await productService.deleteProduct(5); // exclui o produto
      expect(result.type).to.equal(null); // verifica se o tipo é null
      expect(result.message).to.equal(''); 
    });
  });

   afterEach(function () {
     sinon.restore();
   });
 });