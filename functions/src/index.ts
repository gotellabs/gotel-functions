import * as functions from 'firebase-functions';
//import * as admin from 'firebase-admin';
//import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const app = express();
app.use(cors());

const hotels = require('./api/hotels.api');
const rooms = require('./api/rooms.api');
const products = require('./api/products.api');

app.use('/hotels', hotels);
app.use('/', rooms);
app.use('/', products);

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const webApi = functions.https.onRequest(app);
