const express = require('express');
const { productController } = require('../controllers');

const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get(
  '/search',
  productController.getByNameProduct,
);

router.get(
  '/',
  productController.listProducts,
);

router.get(
  '/:id',
  productController.getProduct,
);

router.post(
  '/',
  validateNewProductFields,
  productController.createProduct,
);

router.put(
  '/:id',
  validateNewProductFields,
  productController.updateProduct,
);

router.delete(
  '/:id',
  // validateIdMiddleware,
  productController.deleteProduct,
);

module.exports = router;