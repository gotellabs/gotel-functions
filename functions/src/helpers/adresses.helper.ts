import FirebaseService from "./firebase.helper";
import {Adress, Result, ResultId} from './interfaces'


//extend the FIrebase Helper class
export default class Adresses extends FirebaseService {

  async addAdresses(adressesObject: Adress): Promise<ResultId> {
    try {
        const adresses = await this.firestore.collection("adresses").add(adressesObject);
        const snapshot = await adresses.get();
        return Promise.resolve({ success: true, data: snapshot.data(), id:adresses.id });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Fetch list of Adresses 
   */
  async fetchAllAdresses(): Promise<Result> {
    try {
      
        const result = new Array();
        const snapshot = await this.firestore.collection("adresses").get();
        snapshot.forEach(async adresses => {
          const id = {_id: adresses.id}
          const data = adresses.data()
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
   * @param id Get `AdressList` with the specified `id`
   */
  async fetchAdressesById(id: string): Promise<Result> {
    try {
     
        const adresses = await this.firestore.collection("adresses").doc(id);
        const snapshot = await adresses.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }


  /**
   * Updates the `Adress Collection` with the specified `Document ID` 
   * @param id `Document ID` of the `Adress Collection` to update
   * @param updates Fields to update 
   */
  async updateAdressById(id: string, updates: Adress): Promise<Result> {
    try {
     
        const adresses = await this.firestore.collection("adresses").doc(id);
        if (adresses) {
          await adresses.update(updates);
        }
        const updated = await this.firestore.collection("adresses").doc(id);
        const snapshot = await updated.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Deletes a `Adress` from `Adress Collection` with the specified `ID`
   * @param id `Document Reference ID` to delete a `Adress` 
   */
  async delteAdressById(id: string): Promise<Result> {
    try {
     
        const adresses = await this.firestore.collection("adresses").doc(id);
        if (adresses) {
          await adresses.delete();
        }
        const deleted = await this.firestore.collection("adresses").doc(id);
        const snapshot = await deleted.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }
}