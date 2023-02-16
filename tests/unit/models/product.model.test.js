const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const response = await productModel.findAll();
    expect(response).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const response = await productModel.findById(1);
    expect(response).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productModel.insert(newProduct);
    expect(result).to.equal(42);
  });

  afterEach(function () {
    sinon.restore();
  });
});