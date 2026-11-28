import { build } from 'esbuild';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const publicRoot = path.resolve(packageRoot, '../public');
const applications = ['ai-studio-app', 'cml-wilanow', 'myskincode-ai'];
const requested = process.argv.slice(2);
const selected = requested.length ? requested : applications;

for (const application of selected) {
  if (!applications.includes(application)) throw new Error(`Nieznana aplikacja: ${application}`);
}

const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'bmclinic-embedded-'));
try {
  for (const application of selected) {
    const publicDirectory = path.join(publicRoot, application);
    const snapshot = path.join(publicDirectory, 'src');
    const sourceDirectory = path.join(temporaryRoot, application, 'src');
    const files = await readdir(snapshot, { recursive: true, withFileTypes: true });
    for (const file of files.filter((entry) => entry.isFile())) {
      const originalPath = path.join(file.parentPath, file.name);
      const exported = await readFile(originalPath, 'utf8');
      const sourceMap = exported.match(/sourceMappingURL=data:application\/json[^,]*,([^\s*]+)/);
      const stylesheet = file.name.endsWith('.css')
        ? exported.match(/const __vite__css\s*=\s*("(?:\\.|[^"\\])*")/)
        : null;
      const recovered = sourceMap
        ? JSON.parse(Buffer.from(sourceMap[1], 'base64')).sourcesContent?.[0]
        : stylesheet && JSON.parse(stylesheet[1]);
      if (typeof recovered !== 'string') throw new Error(`Brak źródła dla ${originalPath}`);
      const destination = path.join(sourceDirectory, path.relative(snapshot, originalPath));
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, recovered);
    }

    const dist = path.join(publicDirectory, 'bundle');
    const { outputFiles } = await build({
      entryPoints: [path.join(sourceDirectory, 'main.tsx')],
      outdir: dist,
      nodePaths: [path.join(packageRoot, 'node_modules')],
      bundle: true,
      format: 'esm',
      target: 'es2022',
      jsx: 'automatic',
      minify: true,
      define: { 'process.env.NODE_ENV': '"production"' },
      write: false,
    });

    const hasStylesheet = outputFiles.some((file) => file.path.endsWith('.css'));
    const entry = path.join(publicDirectory, 'index.html');
    let html = await readFile(entry, 'utf8');
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>\s*/gi, (script) => {
      if (script.includes(`src="/${application}/@vite/client"`) ||
          script.includes(`src="/${application}/src/main.tsx"`) ||
          script.includes(`src="/${application}/bundle/main.js"`) ||
          script.includes(`/${application}/@react-refresh`)) {
        return '';
      }
      return script;
    });
    html = html.replace(new RegExp(`[ \\t]*<link rel="stylesheet" href="/${application}/bundle/main.css" />\\r?\\n`), '');
    if (hasStylesheet) {
      html = html.replace('</head>', `<link rel="stylesheet" href="/${application}/bundle/main.css" />\n</head>`);
    }
    html = html.replace('</body>', `<script type="module" src="/${application}/bundle/main.js"></script>\n</body>`);

    await mkdir(dist, { recursive: true });
    for (const output of outputFiles) await writeFile(output.path, output.contents);
    await writeFile(entry, html);
    console.log(`Zbudowano ${application}.`);
  }
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
