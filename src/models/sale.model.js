const camelize = require('camelize');
const connection = require('./connection');
const { dataModel } = require('./product.model');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT t1.sale_id, t2.date, t1.product_id, t1.quantity FROM StoreManager.sales_products t1
    INNER JOIN StoreManager.sales t2 ON t1.sale_id = t2.id
    ORDER BY t1.sale_id, t1.product_id;`,
  );
  return camelize(result); 
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT t2.date, t1.product_id, t1.quantity FROM StoreManager.sales_products t1
    INNER JOIN StoreManager.sales t2 ON t1.sale_id = t2.id
    WHERE t1.sale_id = ?
    ORDER BY t1.product_id;`,
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
    const { columns, placeholders } = dataModel(dados);
    await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
      [insertId, ...Object.values(dados)],
    );
  }));
  return insertId;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?)',
    [id],
    'DELETE FROM StoreManager.sales_products WHERE sale_id = (?)',
    [id],
    );
  return id;
};

const update = async (saleId, sale) => {
  // const keys = Object.keys(snakeize(dados));
  // const values = keys.map(key => `${key} = ?`).join(', ');
  await Promise.all(sale.map(async (dados) => {
    await connection.execute(
      `UPDATE StoreManager.sales_products
      SET quantity = (?) WHERE product_id = (?) AND sale_id = (?)`,
      [dados.quantity, dados.productId, saleId],
    );
  }));
  return saleId;
};

module.exports = {
  findAll,
  findById,
  findSalesProductById,
  insert,
  deleteSale,
  update,
};