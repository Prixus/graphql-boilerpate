import fs from 'fs';
import path from 'path';
import { schema } from './types.js'

const __dirname = path.resolve();

const modulesDir = path.join(__dirname, 'src', 'modules');

// Function to dynamically import all resolvers
const loadResolvers = async () => {
  const moduleDirs = fs
    .readdirSync(modulesDir)
    .filter((file) =>
      fs.statSync(path.join(modulesDir, file)).isDirectory()
    );

  let mainResolver : schema = {};
  for (const moduleName of moduleDirs) {
    const modulePath = `./modules/${moduleName}/index.js`;
    const { resolvers } = await import(modulePath);
    if (resolvers?.Query) {
        mainResolver.Query = Object.assign({}, mainResolver.Query, resolvers?.Query);
        break;
    }
    if (resolvers?.Mutation) {
        mainResolver.Mutation = Object.assign({}, mainResolver.Mutation, resolvers?.Mutation);
        break;
    }
    if (!resolvers?.Mutation || resolvers?.Query) {
        mainResolver = Object.assign({}, mainResolver, resolvers);
        break;
    }
  }

  return mainResolver;
}

export default loadResolvers;