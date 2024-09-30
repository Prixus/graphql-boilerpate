
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const modulesDir = path.join(__dirname, 'src', 'modules');

// Function to dynamically import all schemas
async function loadSchemas() {
  const moduleDirs = fs
    .readdirSync(modulesDir)
    .filter((file) =>
      fs.statSync(path.join(modulesDir, file)).isDirectory()
    );

  const schemas = [];

  for (const moduleName of moduleDirs) {
    const modulePath = `./modules/${moduleName}/index.js`;
    const { schema } = await import(modulePath);
    schemas.push(schema);
  }

  return schemas;
}

export default loadSchemas;