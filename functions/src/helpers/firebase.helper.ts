import * as admin from "firebase-admin";
const path = require("path");


admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname, '../../keys.json')),
    databaseURL: "https://gotel-api.firebaseio.com"
  });


export default class FirebaseService {
  firestore = admin.firestore();
  constructor() {
    this.firestore = this.firestore;
  }
}


