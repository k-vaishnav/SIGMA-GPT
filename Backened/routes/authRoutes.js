import express from 'express';
import { signUp,login } from '../controller/user.js';

const router = express.Router();

router.post('/register',signUp);
router.post('/login',login);

export default router;