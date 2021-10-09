import express from 'express';
// import routers
import cfg from '../config';
import dbInit from './models/init';

const app = express();

app.use(express.json());
app.listen(cfg.PORT, async () => {
  await dbInit();
  console.log(`Server listening on port ${cfg.PORT}`);
});
