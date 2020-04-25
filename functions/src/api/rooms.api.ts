import * as express from "express";
import {handleAddRooms, 
  handleDeleteRoomById, 
  handleFetchRooms,
  handleFetchRoomsById,
  handleUpdateRoomById} from '../controllers/rooms.controller';

const router = express.Router();

router.get("/fetch", handleFetchRooms);
router.post("/add", handleAddRooms);
router.get("/fetch/:id", handleFetchRoomsById);
router.put("/update/:id", handleUpdateRoomById);
router.delete("/remove/:id", handleDeleteRoomById);

module.exports = router