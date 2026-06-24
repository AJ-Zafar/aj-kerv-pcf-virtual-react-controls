/**
 * Prebuild script: copies govuk-frontend assets (fonts, images, CSS) into /public/assets
 * so they are served at /assets/fonts and /assets/images as expected by govuk-frontend CSS.
 */
const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'dist', 'govuk', 'assets')
const dest = path.join(__dirname, '..', 'public', 'assets')

function copyDir(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`[copy-govuk-assets] Source not found: ${from}`)
    return
  }
  fs.mkdirSync(to, { recursive: true })
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, entry.name)
    const destPath = path.join(to, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

copyDir(src, dest)

// Also copy the pre-compiled CSS
const cssSrc = path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'dist', 'govuk', 'govuk-frontend.min.css')
const cssDest = path.join(dest, 'govuk-frontend.min.css')
if (fs.existsSync(cssSrc)) {
  fs.copyFileSync(cssSrc, cssDest)
}

console.log('[copy-govuk-assets] Assets copied to public/assets')
