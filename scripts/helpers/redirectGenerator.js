// redirectGenerator.js

const fs = require('fs');
const path = require('path');

/**
 * Generates an HTML redirect file for a given slug.
 * @param {string} slug - The slug derived from the Markdown filename.
 * @param {string} outputDir - The directory where the HTML file will be saved.
 */
function generateRedirectHtml(slug, outputDir) {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=https://www.license-token.com/#/wiki/${encodeURIComponent(slug)}">
  <title>Redirecting...</title>
</head>
<body>
  <p>If you are not redirected automatically, follow this <a href="https://www.license-token.com/#/wiki/${encodeURIComponent(slug)}">link</a>.</p>
</body>
</html>
  `.trim();

  const fileName = `${slug}.html`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFile(filePath, htmlContent, (err) => {
    if (err) {
      console.error(`Error writing ${fileName}:`, err);
    } else {
      console.log(`Successfully created ${fileName}`);
    }
  });
}

/**
 * Reads all Markdown files from the specified directory and generates HTML redirect files.
 * @param {string} inputDir - The directory containing Markdown files.
 * @param {string} outputDir - The directory where HTML files will be generated.
 */
function processMarkdownFiles(inputDir, outputDir) {
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      return console.error(`Error reading directory ${inputDir}:`, err);
    }

    const markdownFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');

    if (markdownFiles.length === 0) {
      console.log(`No Markdown files found in ${inputDir}.`);
      return;
    }

    markdownFiles.forEach(file => {
      const slug = path.basename(file, '.md');
      generateRedirectHtml(slug, outputDir);
    });
  });
}

// Example usage:
// Define the input and output directories
const inputDirectory = path.join(__dirname, '../../wiki');
const outputDirectory = path.join(__dirname, '../../wiki'); // You can change this to a different directory if desired

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Process all Markdown files
processMarkdownFiles(inputDirectory, outputDirectory);
