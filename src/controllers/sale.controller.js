const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { message } = await saleService.findAll();
  res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await saleService.createSale(sale);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.deleteSale(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const { type, message } = await saleService.updateSale(id, sale);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  listSales,
  getSale,
  createSale,
  deleteSale,
  updateSale,
};