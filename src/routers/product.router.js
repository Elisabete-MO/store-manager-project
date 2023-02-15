const express = require('express');
const { productController } = require('../controllers');

// const validateNewProductFields = require('../middlewares/validateNewProductFields');
// const validateRequestTravelSchema = require('../middlewares/validateRequestTravelSchema');

const router = express.Router();

router.get(
  '/',
  productController.listProducts,
);

router.get(
  '/:id',
  productController.getProduct,
);

// router.post(
//   '/',
//   // validateNewProductFields,
//   productController.createproduct,
// );

// router.post(
//   '/:productId/request/travel',
//   // validateRequestTravelSchema,
//   productController.createTravel,
// );

module.exports = router;