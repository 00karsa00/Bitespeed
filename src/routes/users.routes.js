import express from 'express';
import { identifyInfo } from '../controller/users.controller.js';

const router = express.Router()

router.post("/identify", identifyInfo);

export default router;