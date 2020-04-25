import * as express from "express";
import {handleAddProducts, 
  handleDeleteProductById, 
  handleFetchProducts,
  handleFetchProductsById,
  handleUpdateProductById} from '../controllers/products.controller';

const router = express.Router();

router.get("/fetch", handleFetchProducts);
router.post("/add", handleAddProducts);
router.get("/fetch/:id", handleFetchProductsById);
router.put("/update/:id", handleUpdateProductById);
router.delete("/remove/:id", handleDeleteProductById);

module.exports = router