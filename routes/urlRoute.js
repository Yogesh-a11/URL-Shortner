import express from 'express';
import { handleGenerateNewShortURL, handleGetAnalytics } from '../controllers/urlController.js';
import { authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authorizeUser, handleGenerateNewShortURL)

router.get('/analytics/:shortId', handleGetAnalytics)

export default router