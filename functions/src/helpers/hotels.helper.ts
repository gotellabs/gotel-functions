import FirebaseService from "./firebase.helper";
import {Hotel, Result} from './interfaces'


//extend the FIrebase Helper class
export default class Hotels extends FirebaseService {

  async addHotels(hotelsObject: Hotel): Promise<Result> {
    try {
        const hotels = await this.firestore.collection("hotels").add(hotelsObject);
        const snapshot = await hotels.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Fetch list of Hotels 
   */
  async fetchAllHotels(): Promise<Result> {
    try {
      
        const result = new Array();
        const snapshot = await this.firestore.collection("hotels").get();
        snapshot.forEach(async hotels => {
          const id = {_id: hotels.id}
          const data = hotels.data()
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
   * @param id Get `HotelList` with the specified `id`
   */
  async fetchHotelsById(id: string): Promise<Result> {
    try {
     
        const hotels = await this.firestore.collection("hotels").doc(id);
        const snapshot = await hotels.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }


  /**
   * Updates the `Hotel Collection` with the specified `Document ID` 
   * @param id `Document ID` of the `Hotel Collection` to update
   * @param updates Fields to update 
   */
  async updateHotelById(id: string, updates: Hotel): Promise<Result> {
    try {
     
        const hotels = await this.firestore.collection("hotels").doc(id);
        if (hotels) {
          await hotels.update(updates);
        }
        const updated = await this.firestore.collection("hotels").doc(id);
        const snapshot = await updated.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Deletes a `Hotel` from `Hotel Collection` with the specified `ID`
   * @param id `Document Reference ID` to delete a `Hotel` 
   */
  async delteHotelById(id: string): Promise<Result> {
    try {
     
        const hotels = await this.firestore.collection("hotels").doc(id);
        if (hotels) {
          await hotels.delete();
        }
        const deleted = await this.firestore.collection("hotels").doc(id);
        const snapshot = await deleted.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }
}