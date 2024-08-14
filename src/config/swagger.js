const yamljs = require('yamljs');
const path = require('path');

// Load OpenAPI definition
const openApiDocument = yamljs.load(path.join(__dirname, '../openapi.yaml'));

module.exports = openApiDocument;