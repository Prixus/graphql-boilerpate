import { books } from './model.js';
import { author } from '../author/model.js';

const resolvers = {
    Query: {
      books: () => books,
    },
    Book: {
      author: (parent) => {
        return author.find(author => author.author === parent.author);
      }
    },
    Mutation: {
      createBook: (_, { input }) => {
        return input
    }
  }
};

export default resolvers;