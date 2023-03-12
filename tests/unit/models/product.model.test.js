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

  it('Recuperando um produto a partir do seu ID', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const response = await productModel.findById(1);
    expect(response).to.be.deep.equal(products[0]);
  });

  it('Recuperando um produto a partir do seu nome', async function () {
    const productName = 'Martelo';
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const response = await productModel.findByName(productName);
    expect(connection.execute).to.have.been.calledWith(
      'SELECT * FROM StoreManager.products WHERE name LIKE (?)',
      [`%${productName}%`],
    );
    expect(response).to.be.deep.equal([products[0]]);
  });

  it('Cadastrando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productModel.insert(newProduct);
    expect(result).to.equal(42);
  });

  it('Atualização de um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ id: 42 }]);
    const result = await productModel.update(42, newProduct);
    expect(result).to.equal(42);
  });

  it('Remoção de um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ id: 42 }]);
    const result = await productModel.deleteProduct(42);
    expect(result).to.equal(42);
  });

  afterEach(function () {
    sinon.restore();
  });
});