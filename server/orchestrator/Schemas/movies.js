const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  typeDefs: gql`
  
  type Movie {
    _id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String] 
  }

  extend type Query {
    movies: [Movie]
    findMovie (id: ID!): [Movie]
  }
  
  input movie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String] 
  } 
  

  extend type Mutation {
    createMovie(input: movie ): Movie
    deleteMovie(id: ID!): DeleteResponse
    updateMovie(id: ID!, input: movie): [Movie]
  }
  


  
  `
  ,
  resolvers: {
    Query: {
      async movies() {
        try {
          const moviesCache = await redis.get("movies:data")
          if (moviesCache) {
            console.log('ini dari cache redis movies')
            return JSON.parse(moviesCache)
          }else{
            const { data } = await axios.get('http://localhost:4001/movies')
            console.log('ini data service movies', data)
            redis.set("movies:data", JSON.stringify(data))
            return data
          }
        } catch (err) {
          console.log(err)
        }
      },
      async findMovie(_,args) {
        try {
          const moviesCache = await redis.get("movies:data")
          if (moviesCache) {
            let movieData = JSON.parse(moviesCache).filter(movie => movie._id === args.id) 
            console.log(args.id)
            console.log('ini data find movie by id dari redis', movieData) 
            return movieData
          }else{
            const { data } = await axios.get(`http://localhost:4001/movies/${args.id}`)
            console.log('ini data dari service find movie by id', data)
            return [data]
          }
        }catch(err){
          console.log(err)
        }
      }

    },
    Mutation: {
      async createMovie(_, args) {

        try {
          console.log(args,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INI DATA ARGS INPUT')
          await redis.del("movies:data")
          const { data } = await axios.post('http://localhost:4001/movies', args.input)
          console.log('ini data dari service createMovie', data)
          return data.ops[0]
        } catch (err) {
          console.log(err)
        }
      },
      async deleteMovie(_, args) {
        console.log(args, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<delete di clietn');
        try {
          await redis.del("movies:data")
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
          await redis.del("movies:data")
          const { data } = await axios.put(`http://localhost:4001/movies/${args.id}`, args.input)
          console.log('ini data dari service updateMovie', data)
          return [data.value]
        } catch (err) {
          console.log(err)
        }
      }
    }

  }

}


