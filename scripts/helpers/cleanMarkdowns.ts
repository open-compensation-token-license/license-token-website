import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

export function clearOutput(input: string): string {
  let output = input.replace(/`+/g, "").trim();
  output = output.replace(/^\s*json\s*\r?\n/, '');
  output = output.replace(/^\s*html\s*\r?\n/, '');
  output = output.replace(/^\s*markdown\s*\r?\n/, '');
  output = output.replace(/^\s*typescript\s*\r?\n/, '');
  return output;
}

/**
 * Process all markdown files (ending with .md) in the specified directory.
 */
async function processMarkdownFiles(directory: string): Promise<void> {
  try {
    const files = await readdir(directory);

    // Loop over each file in the directory
    for (const file of files) {
      // Only process files with the markdown extension (.md)
      if (path.extname(file) === '.md') {
        const filePath = path.join(directory, file);
        const fileStats = await stat(filePath);

        // Ensure it's a file (and not a directory)
        if (fileStats.isFile()) {
          // Read the file content
          const content = await readFile(filePath, 'utf8');

          // Apply the clearOutput function to clean up the contents
          const newContent = clearOutput(content);

          // Write the transformed content back to the original file
          await writeFile(filePath, newContent, 'utf8');
          console.log(`Processed: ${file}`);
        }
      }
    }
  } catch (error) {
    console.error("Error processing markdown files:", error);
  }
}

// Usage example: Update 'markdown-files' to the directory containing your markdown files.
const markdownDirectory = path.join(__dirname, '../../wikisrc');
processMarkdownFiles(markdownDirectory);
