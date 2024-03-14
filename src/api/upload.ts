import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.post<{}, MessageResponse>('/', (req, res) => {

  res.json({
    message: 'File Uploaded Successfully! - 🥷🥳🔥',
    success: true,
  });

});

export default router;