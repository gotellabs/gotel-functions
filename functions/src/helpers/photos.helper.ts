import FirebaseService from "./firebase.helper";
import { Photo, Result, ResultId } from './interfaces'


//extend the FIrebase Helper class
export default class Photos extends FirebaseService {

  async addPhotos(photosObject: Photo): Promise<ResultId> {
    try {
      const photos = await this.firestore.collection("photos").add(photosObject);
      const snapshot = await photos.get();
      return Promise.resolve({ success: true, data: snapshot.data(), id: photos.id });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Fetch list of Photos 
   */
  async fetchAllPhotos(): Promise<Result> {
    try {

      const result = new Array();
      const snapshot = await this.firestore.collection("photos").get();
      snapshot.forEach(async photos => {
        const id = { _id: photos.id }
        const data = photos.data()
        const resolveObjects = Object.assign({}, id, data)
        await result.push(resolveObjects);
      });
      return Promise.resolve({ success: true, data: result });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * 
   * @param id Get `PhotoList` with the specified `id`
   */
  async fetchPhotosById(id: string): Promise<Result> {
    try {

      const photos = await this.firestore.collection("photos").doc(id);
      const snapshot = await photos.get();
      return Promise.resolve({ success: true, data: snapshot.data() });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async fetchPhotosByHotel(hotelId: string): Promise<Result> {
    try {

      const result = new Array();
      const snapshot = await this.firestore.collection("photos").where("hotelId", "==", hotelId).get();

      snapshot.forEach(async photos => {
        const id = { _id: photos.id }
        const data = photos.data()
        const resolveObjects = Object.assign({}, id, data)
        await result.push(resolveObjects);
      });

      return Promise.resolve({ success: true, data: result });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async fetchPhotosByRoom(roomId: string): Promise<Result> {
    try {

      const result = new Array();
      const snapshot = await this.firestore.collection("photos").where("roomId", "==", roomId).get();

      snapshot.forEach(async photos => {
        const id = { _id: photos.id }
        const data = photos.data()
        const resolveObjects = Object.assign({}, id, data)
        await result.push(resolveObjects);
      });
      
      return Promise.resolve({ success: true, data: result });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }


  /**
   * Updates the `Photo Collection` with the specified `Document ID` 
   * @param id `Document ID` of the `Photo Collection` to update
   * @param updates Fields to update 
   */
  async updatePhotoById(id: string, updates: Photo): Promise<Result> {
    try {

      const photos = await this.firestore.collection("photos").doc(id);
      if (photos) {
        await photos.update(updates);
      }
      const updated = await this.firestore.collection("photos").doc(id);
      const snapshot = await updated.get();
      return Promise.resolve({ success: true, data: snapshot.data() });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Deletes a `Photo` from `Photo Collection` with the specified `ID`
   * @param id `Document Reference ID` to delete a `Photo` 
   */
  async deltePhotoById(id: string): Promise<Result> {
    try {

      const photos = await this.firestore.collection("photos").doc(id);
      if (photos) {
        await photos.delete();
      }
      const deleted = await this.firestore.collection("photos").doc(id);
      const snapshot = await deleted.get();
      return Promise.resolve({ success: true, data: snapshot.data() });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }
}