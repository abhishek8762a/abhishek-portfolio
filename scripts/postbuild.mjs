// Copies dist/index.html to dist/404.html so static hosts serve the app's own 404 page.
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
if (existsSync('dist/index.html')) {
  copyFileSync('dist/index.html', 'dist/404.html');
  writeFileSync('dist/.nojekyll', '');
  console.log('postbuild: 404.html + .nojekyll created');
}
