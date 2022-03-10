const router = require ('express').Router();

const {
  getList,
  getProduct,
  getStyles,
  getRelated,
} = require("./controller.js");

router.get("/list", getList);

router.get("/:product_id", getProduct);

router.get("/:product_id/styles", getStyles);

router.get("/:product_id/related", getRelated);

module.exports = router;