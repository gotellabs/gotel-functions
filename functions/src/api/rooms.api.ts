import * as express from "express";
import {handleAddRooms, 
  handleDeleteRoomById, 
  handleFetchRooms,
  handleFetchRoomsById,
  handleFetchRoomsByHotel,
  handleUpdateRoomById} from '../controllers/rooms.controller';

const router = express.Router();

router.get("/rooms/fetch", handleFetchRooms);
router.get("/:hotelId/rooms/fetch", handleFetchRoomsByHotel);
router.post("/:hotelId/rooms/add", handleAddRooms);
router.get("/rooms/fetch/:id", handleFetchRoomsById);
router.put("/:hotelId/rooms/update/:id", handleUpdateRoomById);
router.delete("/:hotelId/rooms/remove/:id", handleDeleteRoomById);

module.exports = router