const router = require("express").Router();
const productController = require("../controllers/productController");
const { authGuard, authGuardAdmin } = require("../middleware/authGuard");

router.post("/create_product", authGuardAdmin, productController.createProduct);

router.get("/get_products", productController.getProducts);

router.get("/get_product/:id", productController.getSingleProduct);

router.put(
  "/update_product/:id",
  authGuard,
  authGuardAdmin,
  productController.updateProduct
);

router.delete(
  "/delete_product/:id",
  authGuardAdmin,
  productController.deleteProduct
);

module.exports = router;
