const fs = require('fs');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Dummy LM Studio function simulation
function extractFunctionsFromMarkdown(content) {
  // This should be replaced with actual interaction with LM Studio
  // For now, it returns a dummy function output
  return [{
    name: 'someFunction',
    parameters: [
      { name: 'param1', type: 'string' }
    ]
  }];
}

function generateZodSchema(functions) {
  return functions.map(func => {
    const params = func.parameters.map(param => {
      return `  ${param.name}: z.${param.type}()`;
    }).join(',\n');

    return `const ${func.name}Schema = z.object({\n${params}\n});`;
  }).join('\n\n');
}

function processMarkdownFiles(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(directory, file);
      const content = fs.readFileSync(filePath, 'utf8');

      const frontmatterEndIndex = content.indexOf('---', 3) + 3;
      const frontmatter = content.substring(0, frontmatterEndIndex);
      const docContent = content.substring(frontmatterEndIndex);

      const extractedFunctions = extractFunctionsFromMarkdown(docContent);
      const zodSchema = generateZodSchema(extractedFunctions);

      console.log(`File: ${file}\n${zodSchema}\n`);
    }
  });
}

const docsPath = path.join(__dirname, '../docs/api');
processMarkdownFiles(docsPath);
