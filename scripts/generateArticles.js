const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const wikiDir = path.join(__dirname, '../wikisrc'); // Adjust path as necessary
const outputFile = path.join(__dirname, '../src/assets/articles.json');

function generateSlug(fileName) {
  return fileName
    .replace('.md', '') // Remove Markdown extension
    .replace(/[^a-zA-Z0-9]+/g, '-') // Replace special characters with hyphens
    .toLowerCase();
}

function getLastGitCommitTimestamp(filePath) {
  try {
    // Execute the git command to get the last commit date in ISO format
    const timestamp = execSync(`git log -1 --format=%cI -- "${filePath}"`, {cwd: wikiDir})
      .toString()
      .trim();
    if (!timestamp) {
      throw new Error('Empty timestamp');
    }

    return timestamp;
  } catch (error) {
    console.warn(`Could not retrieve Git commit timestamp for "${filePath}":`, error.message);

    // Fallback: get the file last modified timestamp using the filesystem
    try {
      const stats = fs.statSync(filePath);
      return stats.mtime.toISOString();
    } catch (fsError) {
      console.error(`Could not retrieve filesystem timestamp for "${filePath}":`, fsError.message);
    }
  }
}

function scanMarkdownFiles() {
  if (!fs.existsSync(wikiDir)) {
    console.error(`Wiki directory "${wikiDir}" does not exist!`);
    return [];
  }

  // Only Markdown files
  const files = fs.readdirSync(wikiDir).filter(file => file.endsWith('.md'));

  const articles = [];
  for (const file of files) {
    // Build the path for a .jsonld.json file with the same base name
    const jsonldCandidate = file.replace('.md', '.jsonld.json');
    const metadataCandidate = file.replace('.md', '.htmlmetadata.json');
    const jsonldPath = path.join(wikiDir, jsonldCandidate);

    // If the .jsonld.json file doesn't exist, skip this entry and log a warning
    if (!fs.existsSync(jsonldPath)) {
      console.warn(`Skipping file "${file}" because JSON-LD file is missing: "${jsonldCandidate}"`);
      continue;
    }

    // Get the last Git commit timestamp of the Markdown file
    const filePath = path.join(wikiDir, file);
    const lastModified = getLastGitCommitTimestamp(filePath);

    // Construct a user-friendly title
    const title = file
      .replace(/-/g, ' ')
      .replace('.md', '')
      .replace(/\b\w/g, c => c.toUpperCase());

    articles.push({
      title,
      slug: generateSlug(file),
      markdownFile: `wikisrc/${file}`,         // Adjust path to match Angular's assets
      jsonldFile: `wikisrc/${jsonldCandidate}`,
      htmlMetadataFile: `wikisrc/${metadataCandidate}`,
      lastModified, // Added lastModified timestamp from Git
    });
  }

  return articles;
}

function writeArticlesFile(articles) {
  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
  console.log('Articles JSON file successfully written to:', outputFile);
}

// Main execution
const articles = scanMarkdownFiles();
writeArticlesFile(articles);
