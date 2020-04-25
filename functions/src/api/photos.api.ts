import * as express from "express";
import {
  handleAddPhotos,
  handleDeletePhotoById,
  handleFetchPhotos,
  handleFetchPhotosById,
  handleUpdatePhotoById
} from '../controllers/photo.controller';

const router = express.Router();

router.get("/fetch", handleFetchPhotos);
router.post("/add", handleAddPhotos);
router.get("/fetch/:id", handleFetchPhotosById);
router.put("/update/:id", handleUpdatePhotoById);
router.delete("/remove/:id", handleDeletePhotoById);

module.exports = router