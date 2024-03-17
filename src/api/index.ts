import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import uploadFile from './upload';
import getFiles from './files';
import { authenticate } from '../lib/auth';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {

  res.json({
    message: 'Shared Cloud Storage API - 👋🌎🌍🌏',
  });

});

router.use(authenticate);
router.use('/files', getFiles);
router.use('/upload-file', uploadFile);
export default router;