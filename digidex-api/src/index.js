import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

// On assemble schéma + resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Démarre un serveur HTTP autonome sur le port 4000
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Serveur GraphQL prêt sur ${url}`);