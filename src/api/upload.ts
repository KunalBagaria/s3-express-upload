import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import crypto from 'crypto';
import { s3 } from '../lib/aws';
import { config } from '../lib/config';
import { Router, Request, Response } from 'express';

const router = Router();

const randomHash = () => crypto.randomBytes(64).toString('hex');

const storage = multerS3({
  s3: s3,
  bucket: config.aws.bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (_req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileName = randomHash() + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.array('files'), (req: Request, res: Response) => {
  res.json({
    message: `Files Uploaded Successfully! - 🥷🥳🔥`,
    success: true,
  });
});

export default router;