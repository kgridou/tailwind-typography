#!/usr/bin/env node

/**
 * This script reads the version from the tw-prose package.json
 * and updates the version constant in the demo app
 */

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../../../packages/tw-prose/package.json');
const versionFilePath = path.join(__dirname, '../src/app/constants/version.ts');

try {
  // Read the package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;

  // Generate the version.ts content
  const versionFileContent = `// This version should match the tw-prose package version
// Auto-generated from ../../../../../../packages/tw-prose/package.json
export const TW_PROSE_VERSION = '${version}';
`;

  // Write the version file
  fs.writeFileSync(versionFilePath, versionFileContent);

  console.log(`✅ Updated version to ${version}`);
} catch (error) {
  console.error('❌ Error updating version:', error.message);
  process.exit(1);
}
