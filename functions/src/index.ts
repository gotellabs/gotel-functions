import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


admin.initializeApp({
  credential: admin.credential.cert(path.resolve(__dirname, '../keys.json')),
  databaseURL: "https://gotel-api.firebaseio.com"
});

const app = express();
app.use(cors());

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});