import express from 'express';
// import routers
import cfg from '../config';
import dbInit from './models/init';
import router from './router';
const app = express();

app.use(express.json());
app.use(router);
app.listen(cfg.PORT, async () => {
  await dbInit();
  console.log(`Server listening on port ${cfg.PORT}`);
});
