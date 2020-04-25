import * as express from "express";
import {handleAddProducts, 
  handleDeleteProductById, 
  handleFetchProducts,
  handleFetchProductsById,
  handleFetchProductsByHotel,
  handleUpdateProductById} from '../controllers/products.controller';

const router = express.Router();

router.get("/products/fetch", handleFetchProducts);
router.get("/:hotelId/products/fetch", handleFetchProductsByHotel);
router.post("/:hotelId/products/add", handleAddProducts);
router.get("/products/fetch/:id", handleFetchProductsById);
router.put("/products/update/:id", handleUpdateProductById);
router.delete("/products/remove/:id", handleDeleteProductById);

module.exports = router