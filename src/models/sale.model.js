const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return camelize(result); 
};

const findById = async (saleId) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return camelize(sale);
};

const findSalesProductById = async (saleId) => {
  const [sale] = await connection.execute(
    // `SELECT sales_products.sale_id AS id, JSON_ARRAYAGG(JSON_OBJECT('productId',
    //  sales_products.product_id, 'quantity', sales_products.quantity)) AS itemsSold 
    //  FROM StoreManager.sales_products WHERE sale_id = ? GROUP BY id`, [saleId],
    `SELECT sales_products.product_id AS productId, sales_products.quantity AS quantity 
    FROM StoreManager.sales_products WHERE sales_products.sale_id = ?`, [saleId],
  );
  return (sale);
};

const insert = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES (DEFAULT, NOW())',
  );

  await Promise.all(sale.map(async (dados) => {
    const columns = Object.keys(snakeize(dados)).join(', ');

    const placeholders = Object.keys(dados)
      .map((_key) => '?')
      .join(', ');

    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
      [insertId, ...Object.values(dados)],
    );
  }));
  return insertId;
};

module.exports = {
  findAll,
  findById,
  findSalesProductById,
  insert,
};