const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, newSale, saleById } = require('./mocks/sale.model.mock');

describe('Testes de unidade do model de vendas', function () {
  it('Recuperando a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const response = await saleModel.findAll();
    expect(response).to.be.deep.equal(sales);
  });

  it('Recuperando um venda a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);
    const response = await saleModel.findById(1);
    expect(response).to.be.deep.equal(saleById);
  });

  it('Cadastrando um venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await saleModel.insert(newSale);
    expect(result).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});