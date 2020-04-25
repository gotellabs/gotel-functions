import * as express from "express";
import {
  handleAddHotels,
  handleDeleteHotelById,
  handleFetchHotels,
  handleFetchHotelsById,
  handleAddAddons,
  handleFetchAddons,
  handleUpdateHotelById
} from '../controllers/hotels.controller';

const router = express.Router();

router.get("/fetch", handleFetchHotels);
router.post("/add", handleAddHotels);
router.post("/:id/addons/add", handleAddAddons);
router.get("/:id/addons/fetch", handleFetchAddons);
router.get("/fetch/:id", handleFetchHotelsById);
router.put("/update/:id", handleUpdateHotelById);
router.delete("/remove/:id", handleDeleteHotelById);

module.exports = router