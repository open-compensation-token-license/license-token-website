// save as extract-jsonld.js (for example)

const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const targetDir = '../wiki/';

// Helper function to find and extract JSON-LD data from a file's content
function extractJsonLd(htmlContent) {
  const regex = /<script\s+type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/gi;
  const matches = [];
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    matches.push(match[1]); // capture the JSON-LD content
  }

  return matches;
}

// Main function to process each HTML file in the directory
function processHtmlFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files
      .filter((file) => path.extname(file).toLowerCase() === '.html')
      .forEach((htmlFile) => {
        const fullPath = path.join(directory, htmlFile);
        const fileBaseName = path.basename(htmlFile, '.html');
        const outputJsonFile = path.join(directory, fileBaseName + '.jsonld.json');

        fs.readFile(fullPath, 'utf8', (readErr, data) => {
          if (readErr) {
            console.error(`Error reading file "${fullPath}":`, readErr);
            return;
          }

          // Extract all JSON-LD content
          const jsonldBlocks = extractJsonLd(data);
          if (jsonldBlocks.length > 0) {
            // Optional: parse each block to validate JSON (and handle errors)
            const parsedBlocks = jsonldBlocks.map((block) => {
              try {
                // If it’s valid JSON, parse and re-stringify for a clean format
                return JSON.parse(block);
              } catch (parseErr) {
                // On parse error, just return as string or handle differently
                console.warn(`Invalid JSON in file "${htmlFile}":`, parseErr);
                return block;
              }
            });

            // Write the JSON-LD collected as an array in a JSON file
            fs.writeFile(outputJsonFile, JSON.stringify(parsedBlocks, null, 2), 'utf8', (writeErr) => {
              if (writeErr) {
                console.error(`Error writing file "${outputJsonFile}":`, writeErr);
                return;
              }
              console.log(`Extracted JSON-LD saved to "${outputJsonFile}".`);
            });
          } else {
            console.log(`No JSON-LD scripts found in file "${htmlFile}".`);
          }
        });
      });
  });
}

// Execute the main function
processHtmlFiles(targetDir);
