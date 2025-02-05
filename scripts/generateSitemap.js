// update-sitemap.js

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Configuration
const BASE_URL = 'https://www.license-token.com/#/wiki/';
const ARTICLES_JSON_PATH = path.join(__dirname, '../src/assets/articles.json');
const SITEMAP_XML_PATH = path.join(__dirname, '../src/sitemap.xml');

// Read and parse articles.json
function readArticles() {
  try {
    const data = fs.readFileSync(ARTICLES_JSON_PATH, 'utf-8');
    const articles = JSON.parse(data);
    return articles;
  } catch (error) {
    console.error('Error reading articles.json:', error.message);
    process.exit(1);
  }
}

// Read and parse sitemap.xml
function readSitemap() {
  try {
    const data = fs.readFileSync(SITEMAP_XML_PATH, 'utf-8');
    return data;
  } catch (error) {
    console.error('Error reading sitemap.xml:', error.message);
    process.exit(1);
  }
}

// Generate full URL from slug
function generateUrl(slug) {
  return `${BASE_URL}${slug}`;
}

// Compare two ISO date strings
function isNewer(date1, date2) {
  return new Date(date1) > new Date(date2);
}

// Update sitemap with articles data
function generateSitemap() {
  const articles = readArticles();
  const sitemapXml = readSitemap();

  // Load sitemap.xml into cheerio
  const $ = cheerio.load(sitemapXml, {
    xmlMode: true,
  });

  const urlset = $('urlset');

  if (!urlset.length) {
    console.error('Invalid sitemap.xml format: Missing <urlset> element.');
    process.exit(1);
  }

  articles.forEach((article) => {
    const url = generateUrl(article.slug);
    const articleLastModISO = article.lastModified;
    const articleLastModDate = new Date(articleLastModISO);
    const articleLastModFormatted = articleLastModDate.toISOString().split('T')[0]; // YYYY-MM-DD

    // Find existing <url> element with the same <loc>
    const existingUrlElement = urlset.find(`url:has(loc:contains("${url}"))`);

    if (existingUrlElement.length) {
      const existingLastMod = existingUrlElement.find('lastmod').text();
      const existingLastModDate = new Date(existingLastMod);

      if (isNewer(articleLastModISO, existingLastMod)) {
        // Update <lastmod>
        existingUrlElement.find('lastmod').text(articleLastModDate.toISOString().split('T')[0]);
        console.log(`Updated lastmod for URL: ${url}`);
      }
    } else {
      // Add new <url> entry
      const newUrlEntry = `  <url>
    <loc>${url}</loc>
    <lastmod>${articleLastModDate.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      urlset.append(newUrlEntry);
      console.log(`Added new URL to sitemap: ${url}`);
    }
  });

  // Write the updated sitemap back to sitemap.xml
  try {
    fs.writeFileSync(SITEMAP_XML_PATH, $.xml(), 'utf-8');
    console.log('sitemap.xml has been successfully updated.');
  } catch (error) {
    console.error('Error writing to sitemap.xml:', error.message);
    process.exit(1);
  }
}

// Execute the update
generateSitemap();
