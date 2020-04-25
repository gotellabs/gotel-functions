import * as express from "express";
import {handleAddHotels, 
  handleDeleteHotelById, 
  handleFetchHotels,
  handleFetchHotelsById,
  handleUpdateHotelById} from '../controllers/hotels.controller';

const router = express.Router();

router.get("/fetch", handleFetchHotels);
router.post("/add", handleAddHotels);
router.get("/fetch/:id", handleFetchHotelsById);
router.put("/update/:id", handleUpdateHotelById);
router.delete("/remove/:id", handleDeleteHotelById);

module.exports = router