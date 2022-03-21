import { Router } from 'express';
import * as auth from './controllers/auth';

const router = Router();

router
  .get('/', auth.test)
  .post('/login', auth.login)
  ;

export default router;
