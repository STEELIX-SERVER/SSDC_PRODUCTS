const router = require ('express').Router();

const {
  getAll,
  getProduct,
  getStyles,
  getRelated,
} = require("./controller.js");

router.get("/products", getAll);

router.get("/products/:product_id", getProduct);

router.get("/products/:product_id/styles", getStyles);

router.get("/products/:product_id/related", getRelated);

module.exports = router;