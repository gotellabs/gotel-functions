import FirebaseService from "./firebase.helper";
import {Address, Result, ResultId} from './interfaces'


//extend the FIrebase Helper class
export default class Addresses extends FirebaseService {

  async addAddresses(addressesObject: Address): Promise<ResultId> {
    try {
        const addresses = await this.firestore.collection("addresses").add(addressesObject);
        const snapshot = await addresses.get();
        return Promise.resolve({ success: true, data: snapshot.data(), id:addresses.id });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Fetch list of Addresses 
   */
  async fetchAllAddresses(): Promise<Result> {
    try {
      
        const result = new Array();
        const snapshot = await this.firestore.collection("addresses").get();
        snapshot.forEach(async addresses => {
          const id = {_id: addresses.id}
          const data = addresses.data()
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
   * @param id Get `AddressList` with the specified `id`
   */
  async fetchAddressesById(id: string): Promise<Result> {
    try {
     
        const addresses = await this.firestore.collection("addresses").doc(id);
        const snapshot = await addresses.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }


  /**
   * Updates the `Address Collection` with the specified `Document ID` 
   * @param id `Document ID` of the `Address Collection` to update
   * @param updates Fields to update 
   */
  async updateAddressById(id: string, updates: Address): Promise<Result> {
    try {
     
        const addresses = await this.firestore.collection("addresses").doc(id);
        if (addresses) {
          await addresses.update(updates);
        }
        const updated = await this.firestore.collection("addresses").doc(id);
        const snapshot = await updated.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Deletes a `Address` from `Address Collection` with the specified `ID`
   * @param id `Document Reference ID` to delete a `Address` 
   */
  async delteAddressById(id: string): Promise<Result> {
    try {
     
        const addresses = await this.firestore.collection("addresses").doc(id);
        if (addresses) {
          await addresses.delete();
        }
        const deleted = await this.firestore.collection("addresses").doc(id);
        const snapshot = await deleted.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }
}