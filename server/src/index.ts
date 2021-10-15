import express from 'express';
import cfg from '../config';
import dbInit from './models/init';
import router from './router';
import cors from 'cors';
import populateDb from './funcs/populateDb/populatedb';
import firebaseInit from './util/firebase';
const app = express();

const corsConfig = {
  origin: 'http://localhost:3000/',
};
firebaseInit();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(cfg.PORT, async () => {
  await dbInit();
  await populateDb();
  console.log(`Server listening on port ${cfg.PORT}`);
});
