import * as express from "express";
import {
  handleAddRoomPhotos,
  handleAddHotelPhotos,
  handleDeletePhotoById,
  handleFetchPhotos,
  handleFetchPhotosById,
  handleFetchPhotosByHotel,
  handleFetchPhotosByRoom,
  handleUpdatePhotoById
} from '../controllers/photo.controller';

const router = express.Router();

router.get("/photos/fetch", handleFetchPhotos);
router.post("/rooms/:roomId/photos/add", handleAddRoomPhotos);
router.post("/hotels/:hotelId/photos/add", handleAddHotelPhotos);
router.get("/hotels/:hotelId/photos/fetch", handleFetchPhotosByHotel);
router.get("/rooms/:roomId/photos/fetch", handleFetchPhotosByRoom);
router.get("/photos/fetch/:id", handleFetchPhotosById);
router.put("/photos/update/:id", handleUpdatePhotoById);
router.delete("/photos/remove/:id", handleDeletePhotoById);

module.exports = router