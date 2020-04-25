import FirebaseService from "./firebase.helper";
import {Room, Result, ResultId} from './interfaces'


//extend the FIrebase Helper class
export default class Rooms extends FirebaseService {

  async addRooms(roomsObject: Room): Promise<ResultId> {
    try {
        const rooms = await this.firestore.collection("rooms").add(roomsObject);
        const snapshot = await rooms.get();
        return Promise.resolve({ success: true, data: snapshot.data(), id:rooms.id });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Fetch list of Rooms 
   */
  async fetchAllRooms(): Promise<Result> {
    try {
      
        const result = new Array();
        const snapshot = await this.firestore.collection("rooms").get();
        snapshot.forEach(async rooms => {
          const id = {_id: rooms.id}
          const data = rooms.data()
          const resolveObjects =  Object.assign({}, id, data)
          await result.push(resolveObjects);
        });
        return Promise.resolve({ success: true, data :result });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async fetchAllRoomsByHotel(hotelId: string): Promise<Result> {
    try {
      
        const result = new Array();
        const snapshot = await this.firestore.collection("rooms").where("hotelId","==",hotelId).get();
        snapshot.forEach(async rooms => {
          const id = {_id: rooms.id}
          const data = rooms.data()
          const resolveObjects =  Object.assign({}, id, data)
          await result.push(resolveObjects);
        });
        return Promise.resolve({ success: true, data :result });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * 
   * @param id Get `RoomList` with the specified `id`
   */
  async fetchRoomsById(id: string): Promise<Result> {
    try {
     
        const rooms = await this.firestore.collection("rooms").doc(id);
        const snapshot = await rooms.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }


  /**
   * Updates the `Room Collection` with the specified `Document ID` 
   * @param id `Document ID` of the `Room Collection` to update
   * @param updates Fields to update 
   */
  async updateRoomById(id: string, updates: Room): Promise<Result> {
    try {
     
        const rooms = await this.firestore.collection("rooms").doc(id);
        if (rooms) {
          await rooms.update(updates);
        }
        const updated = await this.firestore.collection("rooms").doc(id);
        const snapshot = await updated.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Deletes a `Room` from `Room Collection` with the specified `ID`
   * @param id `Document Reference ID` to delete a `Room` 
   */
  async delteRoomById(id: string): Promise<Result> {
    try {
     
        const rooms = await this.firestore.collection("rooms").doc(id);
        if (rooms) {
          await rooms.delete();
        }
        const deleted = await this.firestore.collection("rooms").doc(id);
        const snapshot = await deleted.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }
}