// Copies dist/index.html to dist/404.html so GitHub Pages serves the app for unknown paths,
// and adds .nojekyll so files starting with "_" are served.
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
if (existsSync('dist/index.html')) {
  copyFileSync('dist/index.html', 'dist/404.html');
  writeFileSync('dist/.nojekyll', '');
  console.log('postbuild: 404.html + .nojekyll created');
}
