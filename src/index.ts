import app from './lib/app';
import { config } from './lib/config';
import { validateAllEnvVars } from './lib/config';
import { generateQRCode } from './lib/qr-code';

app.listen(config.port, () => {
  validateAllEnvVars();
  generateQRCode();
  /* eslint-disable no-console */
  console.log('Scan the QR code on your app to connect to the server.');
  console.log(`Listening: http://localhost:${config.port}`);
  /* eslint-enable no-console */
});