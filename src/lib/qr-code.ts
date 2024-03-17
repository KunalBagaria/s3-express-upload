import qrcode from 'qrcode-terminal';
import { config } from './config';

export function generateQRCode() {
  const appConfig = {
    password: config.password,
    serverUrl: config.serverUrl,
  };
  qrcode.generate(JSON.stringify(appConfig), { small: true });
}