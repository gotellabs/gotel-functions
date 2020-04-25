import * as express from "express";
import {handleAddAddons, 
  handleDeleteAddonById, 
  handleFetchAddons,
  handleFetchAddonsById,
  handleUpdateAddonById} from '../controllers/addons.controller';

const router = express.Router();

router.get("/fetch", handleFetchAddons);
router.post("/add", handleAddAddons);
router.get("/fetch/:id", handleFetchAddonsById);
router.put("/update/:id", handleUpdateAddonById);
router.delete("/remove/:id", handleDeleteAddonById);

module.exports = router