import FirebaseService from "./firebase.helper";
import {Addon, Result, ResultId} from './interfaces'


//extend the FIrebase Helper class
export default class Addons extends FirebaseService {

  async addAddons(addonsObject: Addon): Promise<ResultId> {
    try {
        const addons = await this.firestore.collection("addons").add(addonsObject);
        const snapshot = await addons.get();
        return Promise.resolve({ success: true, data: snapshot.data(), id:addons.id });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Fetch list of Addons 
   */
  async fetchAllAddons(): Promise<Result> {
    try {
      
        const result = new Array();
        const snapshot = await this.firestore.collection("addons").get();
        snapshot.forEach(async addons => {
          const id = {_id: addons.id}
          const data = addons.data()
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
   * @param id Get `AddonList` with the specified `id`
   */
  async fetchAddonsById(id: string): Promise<Result> {
    try {
     
        const addons = await this.firestore.collection("addons").doc(id);
        const snapshot = await addons.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }


  /**
   * Updates the `Addon Collection` with the specified `Document ID` 
   * @param id `Document ID` of the `Addon Collection` to update
   * @param updates Fields to update 
   */
  async updateAddonById(id: string, updates: Addon): Promise<Result> {
    try {
     
        const addons = await this.firestore.collection("addons").doc(id);
        if (addons) {
          await addons.update(updates);
        }
        const updated = await this.firestore.collection("addons").doc(id);
        const snapshot = await updated.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Deletes a `Addon` from `Addon Collection` with the specified `ID`
   * @param id `Document Reference ID` to delete a `Addon` 
   */
  async delteAddonById(id: string): Promise<Result> {
    try {
     
        const addons = await this.firestore.collection("addons").doc(id);
        if (addons) {
          await addons.delete();
        }
        const deleted = await this.firestore.collection("addons").doc(id);
        const snapshot = await deleted.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }
}