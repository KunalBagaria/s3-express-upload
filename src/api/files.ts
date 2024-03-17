import express, { Request, Response } from 'express';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { config } from '../lib/config';

const router = express.Router();
const s3Client = new S3Client({ region: config.aws.region });

// Adjusted route to include optional path parameters for date filtering
router.get('/:startDate?/:endDate?', async (req: Request, res: Response) => {
  const { startDate, endDate } = req.params;

  try {
    const listObjectsCommand = new ListObjectsCommand({
      Bucket: config.aws.bucket,
    });
    const response = await s3Client.send(listObjectsCommand);

    if (response.Contents) {
      const cloudFrontDomainName = config.aws.cloudFrontDomain;

      let filesByDate: { [key: string]: string[] } = {};

      // Filter and organize files by date range if startDate and endDate are provided
      if (startDate && endDate) {
        const start = new Date(startDate.split('-').reverse().join('-'));
        const end = new Date(endDate.split('-').reverse().join('-'));
        end.setDate(end.getDate() + 1); // Make end date inclusive

        response.Contents.forEach(content => {
          if (content.Key && content.LastModified) {
            const contentDate = new Date(content.LastModified);
            if (contentDate >= start && contentDate < end) {
              const dateKey = content.LastModified.toISOString().split('T')[0];
              const formattedDate = `${dateKey.split('-')[2]}-${dateKey.split('-')[1]}-${dateKey.split('-')[0]}`;

              if (!filesByDate[formattedDate]) {
                filesByDate[formattedDate] = [];
              }

              filesByDate[formattedDate].push(`${cloudFrontDomainName}/${content.Key}`);
            }
          }
        });
      } else {
        // Original logic to organize files by date without filtering
        response.Contents.forEach(content => {
          if (content.Key && content.LastModified) {
            const dateKey = content.LastModified.toISOString().split('T')[0];
            const formattedDate = `${dateKey.split('-')[2]}-${dateKey.split('-')[1]}-${dateKey.split('-')[0]}`;

            if (!filesByDate[formattedDate]) {
              filesByDate[formattedDate] = [];
            }

            filesByDate[formattedDate].push(`${cloudFrontDomainName}/${content.Key}`);
          }
        });
      }

      res.json({
        success: true,
        filesByDate,
      });

    } else {
      res.status(404).json({
        success: false,
        message: 'No files found in the bucket',
      });
    }

  } catch (error) {
    console.error('Error listing files from S3:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list files from S3',
    });
  }
});

export default router;