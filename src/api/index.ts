import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import uploadFile from './upload';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {

  res.json({
    message: 'Shared Cloud Storage API - 👋🌎🌍🌏',
  });

});

router.use('/upload-file', uploadFile);

export default router;