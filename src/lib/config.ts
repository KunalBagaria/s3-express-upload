import dotenv from 'dotenv';
dotenv.config();

function validateEnvVar(name: string) {
  if (!process.env[name]) {
    console.error(`Environment variable ${name} is not defined`);
    process.exit(1);
  }
}

export function validateAllEnvVars() {
  const requiredEnvVars = [
    'AWS_REGION',
    'AWS_BUCKET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'CLOUDFRONT_DOMAIN',
    'PASSWORD',
    'SERVER_URL',
  ];
  requiredEnvVars.forEach(validateEnvVar);
}

export const config = {
  port: process.env.PORT || 8080,
  password: process.env.PASSWORD!,
  serverUrl: process.env.SERVER_URL!,
  aws: {
    region: process.env.AWS_REGION!,
    bucket: process.env.AWS_BUCKET!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    cloudFrontDomain: process.env.CLOUDFRONT_DOMAIN!,
  },
}