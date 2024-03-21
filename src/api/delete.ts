// delete.ts
import express, { Request, Response } from 'express';
import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { config } from '../lib/config';

const router = express.Router();
const s3Client = new S3Client({ region: config.aws.region });

router.delete('/', async (req: Request, res: Response) => {
  const { fileKeys } = req.body; // Expect fileKeys to be an array of strings (S3 object keys)

  if (!fileKeys || !Array.isArray(fileKeys) || fileKeys.length === 0) {
    return res.status(400).json({ message: 'Invalid request. Please provide an array of file keys.' });
  }

  const objectsToDelete = fileKeys.map(key => ({ Key: key }));

  try {
    const deleteParams = {
      Bucket: config.aws.bucket,
      Delete: { Objects: objectsToDelete },
    };

    await s3Client.send(new DeleteObjectsCommand(deleteParams));

    res.json({
      success: true,
      message: 'Files successfully deleted.',
      deleted: objectsToDelete.map(obj => obj.Key), // Echo back the keys of deleted objects
    });
  } catch (error) {
    console.error('Error deleting files:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete files. Please try again.',
    });
  }
});

export default router;
