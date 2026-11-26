import fs from 'fs';
import http, { Server as HttpServer } from 'http';
import net from 'net';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';

const AETHER_PORT = Number(process.env.AETHER_PORT) || 3017;

const AETHER_API_PREFIXES = [
  '/api/studio',
  '/api/gemini',
  '/api/vision',
  '/api/screen-map',
  '/api/driver-calibration',
  '/api/user',
  '/api/network-info',
  '/api/github/oauth',
];

function isAetherApiPath(reqPath: string): boolean {
  return AETHER_API_PREFIXES.some(
    (prefix) => reqPath === prefix || reqPath.startsWith(`${prefix}/`)
  );
}

/**
 * Modular integration bridge for Aether Tactile Studio (/aether/).
 * Designed cleanly in one file so it can be detached at any time without touching core BM Clinic logic.
 */
export function registerAetherBridge(
  app: Express,
  httpServer: HttpServer,
  masterRootDir: string
) {
  const aetherDistPath = path.join(masterRootDir, 'public', 'aether');
  if (fs.existsSync(aetherDistPath)) {
    app.get(['/aether', '/aether/'], (_req, res) => {
      res.setHeader('Cache-Control', 'no-store');
      res.sendFile(path.join(aetherDistPath, 'index.html'));
    });

    app.get('/assets/bm-clinic-proktologia-screen.jpg', (_req, res) => {
      res.sendFile(path.join(aetherDistPath, 'assets', 'bm-clinic-proktologia-screen.jpg'));
    });
    app.use('/assets/aistudio', express.static(path.join(aetherDistPath, 'assets', 'aistudio')));

    app.use('/aether', express.static(aetherDistPath, { etag: false, maxAge: 0 }));

    app.get('/aether/*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-store');
      res.sendFile(path.join(aetherDistPath, 'index.html'));
    });
  }

  // Forward Aether API requests to local Aether backend (port 3017)
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (!isAetherApiPath(req.path)) {
      return next();
    }

    const proxyReq = http.request(
      {
        hostname: '127.0.0.1',
        port: AETHER_PORT,
        path: req.originalUrl,
        method: req.method,
        headers: {
          ...req.headers,
          host: `127.0.0.1:${AETHER_PORT}`,
        },
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      }
    );

    proxyReq.on('error', (err) => {
      if (!res.headersSent) {
        res.status(503).json({
          error: 'Aether backend (:3017) nie odpowiada',
          detail: err.message,
        });
      }
    });

    req.pipe(proxyReq, { end: true });
  });

  // Forward /ws/live WebSocket upgrades cleanly to Aether backend (:3017)
  httpServer.on('upgrade', (req, clientSocket, head) => {
    const reqUrl = req.url || '';
    if (!reqUrl.startsWith('/ws/live')) return;

    const upstream = net.connect(AETHER_PORT, '127.0.0.1', () => {
      const headerLines = [`${req.method || 'GET'} ${reqUrl} HTTP/${req.httpVersion || '1.1'}`];
      for (const [k, v] of Object.entries(req.headers)) {
        if (typeof v === 'undefined') continue;
        if (k.toLowerCase() === 'host') {
          headerLines.push(`Host: 127.0.0.1:${AETHER_PORT}`);
        } else if (Array.isArray(v)) {
          v.forEach((val) => headerLines.push(`${k}: ${val}`));
        } else {
          headerLines.push(`${k}: ${v}`);
        }
      }
      upstream.write(`${headerLines.join('\r\n')}\r\n\r\n`);
      if (head && head.length > 0) upstream.write(head);
      upstream.pipe(clientSocket);
      clientSocket.pipe(upstream);
    });

    upstream.on('error', () => {
      clientSocket.destroy();
    });
    clientSocket.on('error', () => {
      upstream.destroy();
    });
  });
}
