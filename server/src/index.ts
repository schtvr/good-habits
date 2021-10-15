import express from 'express';
import cfg from '../config';
import dbInit from './models/init';
import router from './router';
import cors from 'cors';
import populateDb from './funcs/populateDb/populatedb';
import firebaseInit from './util/firebase';
const app = express();
var admin = require('firebase-admin');

var serviceAccount = require('../good-habits-79e11-firebase-adminsdk-ivczh-43fd051544.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://good-habits-79e11-default-rtdb.firebaseio.com'
});
const corsConfig = {
  origin: 'http://localhost:3000/',
};


app.use(cors());
app.use(express.json());
app.use(router);

app.listen(cfg.PORT, async () => {
  await dbInit();
  await populateDb();
  console.log(`Server listening on port ${cfg.PORT}`);
});
