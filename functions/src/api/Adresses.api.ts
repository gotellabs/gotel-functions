import * as express from "express";
import {handleAddAdresses, 
  handleDeleteAdressById, 
  handleFetchAdresses,
  handleFetchAdressesById,
  handleUpdateAdressById} from '../controllers/adresses.controller';

const router = express.Router();

router.get("/fetch", handleFetchAdresses);
router.post("/add", handleAddAdresses);
router.get("fetch/:id", handleFetchAdressesById);
router.put("update/:id", handleUpdateAdressById);
router.delete("remove/:id", handleDeleteAdressById);

module.exports = router