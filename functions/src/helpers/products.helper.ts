import FirebaseService from "./firebase.helper";
import {Product, Result, ResultId} from './interfaces'


//extend the FIrebase Helper class
export default class Products extends FirebaseService {

  async addProducts(productsObject: Product): Promise<ResultId> {
    try {
        const products = await this.firestore.collection("products").add(productsObject);
        const snapshot = await products.get();
        return Promise.resolve({ success: true, data: snapshot.data(), id:products.id });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Fetch list of Products 
   */
  async fetchAllProducts(): Promise<Result> {
    try {
      
        const result = new Array();
        const snapshot = await this.firestore.collection("products").get();
        snapshot.forEach(async products => {
          const id = {_id: products.id}
          const data = products.data()
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
   * @param id Get `ProductList` with the specified `id`
   */
  async fetchProductsById(id: string): Promise<Result> {
    try {
     
        const products = await this.firestore.collection("products").doc(id);
        const snapshot = await products.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }


  /**
   * Updates the `Product Collection` with the specified `Document ID` 
   * @param id `Document ID` of the `Product Collection` to update
   * @param updates Fields to update 
   */
  async updateProductById(id: string, updates: Product): Promise<Result> {
    try {
     
        const products = await this.firestore.collection("products").doc(id);
        if (products) {
          await products.update(updates);
        }
        const updated = await this.firestore.collection("products").doc(id);
        const snapshot = await updated.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
     
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Deletes a `Product` from `Product Collection` with the specified `ID`
   * @param id `Document Reference ID` to delete a `Product` 
   */
  async delteProductById(id: string): Promise<Result> {
    try {
     
        const products = await this.firestore.collection("products").doc(id);
        if (products) {
          await products.delete();
        }
        const deleted = await this.firestore.collection("products").doc(id);
        const snapshot = await deleted.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }
}