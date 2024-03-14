import app from './lib/app';
import { config } from './lib/config';
import { validateAllEnvVars } from './lib/config';

app.listen(config.port, () => {
  validateAllEnvVars();
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${config.port}`);
  /* eslint-enable no-console */
});