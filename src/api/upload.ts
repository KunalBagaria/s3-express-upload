import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from '../lib/aws';
import { config } from '../lib/config';

const router = express.Router();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.aws.bucket,
    key: (_req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

router.post<{}, MessageResponse>('/', upload.array('files'), (req, res, next) => {
  res.json({
    message: `Files Uploaded Successfully! - 🥷🥳🔥`,
    success: true,
  });
});

export default router;