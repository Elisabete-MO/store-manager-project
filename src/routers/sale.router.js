const express = require('express');
const { saleController } = require('../controllers');
const validateNewSaleFields = require('../middlewares/validateNewSaleFields');

const router = express.Router();

router.get(
  '/',
  saleController.listSales,
);

router.get(
  '/:id',
  saleController.getSale,
);

router.post(
  '/',
  validateNewSaleFields,
  saleController.createSale,
);

router.delete(
  '/:id',
  saleController.deleteSale,
);

router.put(
  '/:id',
  validateNewSaleFields,
  saleController.updateSale,
);

module.exports = router;