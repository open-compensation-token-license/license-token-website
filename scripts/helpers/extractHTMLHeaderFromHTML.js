// install cheerio with: npm install cheerio
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Directory containing your HTML files
const wikiDir = path.join(__dirname, '../wiki');

function extractMetaDataFromHtml(htmlFilePath) {
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  const $ = cheerio.load(htmlContent);

  const pageTitle = $('title').text() || '';
  const pageDescription = $('meta[name="description"]').attr('content') || '';
  const pageKeywords = $('meta[name="keywords"]').attr('content') || '';

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
  };
}

function generateMetadataFiles() {
  // Gather all HTML files in /wiki
  const files = fs.readdirSync(wikiDir);
  const htmlFiles = files.filter(file => file.endsWith('.html'));

  // Loop through each HTML file
  htmlFiles.forEach(htmlFile => {
    const htmlFilePath = path.join(wikiDir, htmlFile);
    // Parse for metadata
    const extractedMeta = extractMetaDataFromHtml(htmlFilePath);

    // Construct a JSON file name by using the same base name
    const baseName = path.basename(htmlFile, '.html');
    const outputJsonPath = path.join(wikiDir, `${baseName}.metadata.json`);

    // Write out a new JSON file
    fs.writeFileSync(outputJsonPath, JSON.stringify(extractedMeta, null, 2), 'utf8');
    console.log(`Metadata for ${htmlFile} saved to ${outputJsonPath}`);
  });
}

// Execute
generateMetadataFiles();
