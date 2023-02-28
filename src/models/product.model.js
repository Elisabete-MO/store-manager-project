const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const dataModel = (data) => {
  const columns = Object.keys(snakeize(data)).join(', ');
  const placeholders = Object.keys(data)
    .map((_key) => '?')
    .join(', ');
  return ({ columns, placeholders });
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result); 
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const insert = async (product) => {
  const { columns, placeholders } = dataModel(product);
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const update = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
    [name, id],
    );
  return id;
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)',
    [id],
    );
  return id;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
  dataModel,
};