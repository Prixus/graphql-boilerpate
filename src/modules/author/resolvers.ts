import { author } from './model.js';

const resolvers = {
    Query: {
      authors: () => author,
    }
  };
  
export default resolvers;