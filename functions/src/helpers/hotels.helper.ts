import FirebaseService from "./firebase.helper";
import { Hotel, AddonHotel, Result, ResultId } from './interfaces'


//extend the FIrebase Helper class
export default class Hotels extends FirebaseService {

  async addHotels(hotelsObject: Hotel): Promise<ResultId> {
    try {
      const hotels = await this.firestore.collection("hotels").add(hotelsObject);
      const snapshot = await hotels.get();
      return Promise.resolve({ success: true, data: snapshot.data(), id: hotels.id });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async addAddons(addons: Array<string>, hotelId: string): Promise<ResultId> {
    try {

      for (let index = 0; index < addons.length; index++) {
        const addonId = addons[index];
        const addonHotel: AddonHotel = { addonId, hotelId }
        await this.firestore.collection("hotels-addons").add(addonHotel);
      }

      return Promise.resolve({ success: true, data: addons, id: hotelId });

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

      for (let index = 0; index < snapshot.size; index++) {

        const hotel = snapshot.docs[index];
        const data = hotel.data();

        //Get Address
        const addressId = await hotel.get("addressId");
        const address = await this.firestore.collection("addresses").doc(addressId);
        const addressSnap = await address.get();

        const resolveObj = Object.assign({}, addressSnap.data())
        
        //Get Address
        const photos = await this.firestore.collection("photos").where("hotelId", "==", hotel.id).get();
        const photosArray = new Array()
        
        photos.forEach(photo=>{
          photosArray.push(photo.data())
        });

        console.error(photosArray)

        const id = { _id: hotel.id, address: resolveObj, photos: photosArray}
        const resolveObjects = Object.assign({}, id, data)
        await result.push(resolveObjects);
      }

      return Promise.resolve({ success: true, data: result });

    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async fetchAllAddons(hotelId: string): Promise<Result> {
    try {

      const result = new Array();
      const snapshot = await this.firestore.collection("hotels-addons").where("hotelId", "==", hotelId).get();

      snapshot.forEach(async hotelsAddons => {
        const id = { _id: hotelsAddons.id }
        const data = hotelsAddons.data()
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
   * @param id Get `HotelList` with the specified `id`
   */
  async fetchHotelsById(id: string): Promise<Result> {
    try {

      const hotels = await this.firestore.collection("hotels").doc(id);
      const snapshot = await hotels.get();

      const data = snapshot.data()

      //Get Address
      const addressId = await snapshot.get("addressId");
      const address = await this.firestore.collection("addresses").doc(addressId);
      const addressSnap = await address.get();

      const addressObj = Object.assign({}, addressSnap.data())

      //Get Address
      const photos = await this.firestore.collection("photos").where("hotelId", "==", snapshot.id).get();
      const photosArray = new Array()

      photos.forEach(photo=>{
        photosArray.push(photo.data())
      });
      
      const _id = { _id: snapshot.id, address: addressObj, photos: photosArray}
      const resolveObjects = Object.assign({}, _id, data)
      console.error(resolveObjects)

      return Promise.resolve({ success: true, data: resolveObjects });

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