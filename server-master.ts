process.env.CHRONOS_EMBEDDED = '1';

import path from 'path';
import { fileURLToPath } from 'url';
import next from 'next';
import {
  chronosMasterApp,
  chronosMasterHttpServer,
  initChronosMasterRoutes,
} from './chronos-vault-module/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bootUnifiedMaster() {
  const PORT = Number(process.env.PORT) || 3016;
  const nextApp = next({
    dev: false,
    dir: __dirname,
  });

  await nextApp.prepare();
  await initChronosMasterRoutes();

  const nextHandler = nextApp.getRequestHandler();
  chronosMasterApp.all('*', (req, res) => nextHandler(req, res));

  chronosMasterHttpServer.listen(PORT, '0.0.0.0', () => {
    console.log(
      `[BMClinic x Holding x ChronosVault Unified Master] listening on http://localhost:${PORT}`
    );
  });
}

bootUnifiedMaster().catch((err) => {
  console.error('[bootUnifiedMaster] Fatal startup error:', err);
  process.exit(1);
});
