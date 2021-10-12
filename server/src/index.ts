import express from 'express';
import cfg from '../config';
import dbInit from './models/init';
import router from './router';
import populateDb from './funcs/populatedb';
const app = express();

app.use(express.json());
app.use(router);
app.listen(cfg.PORT, async () => {
  await dbInit();
  await populateDb();
  console.log(`Server listening on port ${cfg.PORT}`);
});
