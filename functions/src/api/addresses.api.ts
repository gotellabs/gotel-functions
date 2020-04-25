import * as express from "express";
import {handleAddAddresses, 
  handleDeleteAddressById, 
  handleFetchAddresses,
  handleFetchAddressesById,
  handleUpdateAddressById} from '../controllers/addresses.controller';

const router = express.Router();

router.get("/fetch", handleFetchAddresses);
router.post("/add", handleAddAddresses);
router.get("/fetch/:id", handleFetchAddressesById);
router.put("/update/:id", handleUpdateAddressById);
router.delete("/remove/:id", handleDeleteAddressById);

module.exports = router