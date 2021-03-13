const { ApolloServer, gql } = require('apollo-server')
const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')
const { deleteMoviesById } = require('../orchestrator-express/controllers/EntertainmeMovies')

const typeDefs = gql`
type Movie {
  _id: ID!
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String] 
}

type Query {
  message: String
  movies: [Movie]
}

input movie {
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String] 
} 

type Mutation {
  createMovie(input: movie ): Movie
  deleteMovie(id: ID!): DeleteResponse
  updateMovie(id: ID!, input: movie): UpdateResponse
}

type DeleteResponse {
  message: String
}

type UpdateResponse {
  message: String
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String] 
}


`
const resolvers = {
  Query: {
    message() {
      return ' Hello from other side'
    },

    async movies() {
      try {
        const { data } = await axios.get('http://localhost:4001/movies')
        console.log('ini data service movies', data)
        return data
      } catch (err) {
        console.log(err)
      }
    },

    // async tvSeries() {
    //   try {
    //     const { data } = await axios.get('http://localhost:4002/tvSeries')
    //     console.log('ini data service tv series', data)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

  },
  Mutation: {
    async createMovie(_, args) {
      // console.log(args.input)
      try {
        const { data } = await axios.post('http://localhost:4001/movies', args.input)
        console.log('ini data dari service createMovie', data)
        return data.ops[0]
      } catch (err) {
        console.log(err)
      }
    },
    async deleteMovie(_, args) {
      try {
        const { data } = await axios.delete(`http://localhost:4001/movies/${args.id}`)
        console.log('ini data dari service deleteMovie', data)
        return { message: "success delete" }
      } catch (err) {
        console.log(err)
      }
    },

    async updateMovie(_, args) {
      try {
        console.log(args, '>>>>>>>>>>>>>>>>>>>>>>>')
        const { data } = await axios.put(`http://localhost:4001/movies/${args.id}`, args.input)
        console.log('ini data dari service updateMovie', data)
        return { message: "success update" }
      } catch (err) {
        console.log(err)
      }
    }
  }
}


const server = new ApolloServer({ typeDefs, resolvers })


server.listen().then(({ url }) => {
  console.log(`Apollo server ready at url`, url);
})