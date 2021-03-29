const { ApolloServer, gql } = require('apollo-server')

const MoviesSchema = require ('./Schemas/movies')
const TvSeriesSchema = require('./Schemas/tvSeries')


const typeDefs = gql`

type Query

type Mutation 

type DeleteResponse {
  message: String
}


`
const resolvers = {}


const server = new ApolloServer({ typeDefs: [typeDefs, MoviesSchema.typeDefs, TvSeriesSchema.typeDefs], resolvers: [resolvers, MoviesSchema.resolvers, TvSeriesSchema.resolvers] })


server.listen().then(({ url }) => {
  console.log(`Apollo server ready at url`, url);
})