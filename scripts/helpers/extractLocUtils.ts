// extractLoc.ts

import * as fs from 'fs';
import * as path from 'path';
import {parseStringPromise} from 'xml2js';

/**
 * Function to read and parse the sitemap.xml file.
 * @param filePath - Path to the sitemap.xml file.
 * @returns A promise that resolves to the parsed XML object.
 */
async function parseSitemap(filePath: string): Promise<any> {
  try {
    const xmlData = fs.readFileSync(filePath, 'utf-8');
    const result = await parseStringPromise(xmlData, {
      explicitArray: false,
      ignoreAttrs: true,
    });
    return result;
  } catch (error) {
    console.error(`Error reading or parsing the file: ${error}`);
    throw error;
  }
}

/**
 * Function to extract all <loc> URLs from the parsed sitemap object.
 * @param sitemap - The parsed sitemap object.
 * @returns An array of URLs as strings.
 */
function extractLoc(sitemap: any): string[] {
  const urls: any[] = sitemap.urlset.url;
  const locs: string[] = [];

  if (Array.isArray(urls)) {
    urls.forEach((url) => {
      if (url.loc) {
        locs.push(url.loc);
      }
    });
  } else if (urls.loc) {
    locs.push(urls.loc);
  }

  return locs;
}

/**
 * Function to write the extracted URLs to a JSON file.
 * @param locs - Array of URL strings.
 * @param outputPath - Path to the output JSON file.
 */
function exportLoc(locs: string[], outputPath: string): void {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(locs, null, 2), 'utf-8');
    console.log(`Successfully exported ${locs.length} URLs to ${outputPath}`);
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
    throw error;
  }
}

/**
 * Main function to execute the script.
 */
async function main() {
  const sitemapPath = path.join(__dirname, '../../src/sitemap.xml'); // Adjust the path if necessary
  const outputPath = path.join(__dirname, 'locs.json');

  try {
    const parsedSitemap = await parseSitemap(sitemapPath);
    const locs = extractLoc(parsedSitemap);
    exportLoc(locs, outputPath);
  } catch (error) {
    console.error('An error occurred during the extraction process.');
  }
}

main();
