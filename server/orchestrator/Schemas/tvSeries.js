const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  typeDefs: gql`
  
  type Serie {
    _id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String] 
  }

  extend type Query {
    series: [Serie]
    findSerie (id: ID!): [Serie]
  }

  
  input serie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String] 
  } 

  extend type Mutation {
    createSerie(input: serie ): Serie
    deleteSerie(id: ID!): DeleteResponse
    updateSerie(id: ID!, input: serie): [Serie]
  }
  


  
  `
  ,
  resolvers: {
    Query: {
      async series() {
        try {
          const seriesCache = await redis.get("series:data")
          if (seriesCache) {
            console.log('ini dari cache redis tvseries')
            return JSON.parse(seriesCache)
          }else{
            const { data } = await axios.get('http://localhost:4002/tvseries')
            console.log('ini data service tvseries', data)
            redis.set("series:data", JSON.stringify(data))
            return data
          }
        } catch (err) {
          console.log(err)
        }
      },
      async findSerie(_,args) {
        try {
          const seriesCache = await redis.get("series:data")
          if (seriesCache) {
            let serieData = JSON.parse(seriesCache).filter(serie => serie._id === args.id) 
            console.log(args.id)
            console.log('ini data find tvseries by id dari redis', serieData) 
            return serieData
          }else{
            const { data } = await axios.get(`http://localhost:4002/tvseries/${args.id}`)
            console.log('ini data dari service find tvseries by id', data)
            return [data]
          }
        }catch(err){
          console.log(err)
        }
      }

    },
    Mutation: {
      async createSerie(_, args) {

        try {
          await redis.del("series:data")
          const { data } = await axios.post('http://localhost:4002/tvseries', args.input)
          console.log('ini data dari service createSerie', data)
          return data.ops[0]
        } catch (err) {
          console.log(err)
        }
      },
      async deleteSerie(_, args) {
        try {
          await redis.del("series:data")
          const { data } = await axios.delete(`http://localhost:4002/tvseries/${args.id}`)
          console.log('ini data dari service deleteSerie', data)
          return { message: "success delete" }
        } catch (err) {
          console.log(err)
        }
      },

      async updateSerie(_, args) {
        try {
          console.log(args, '>>>>>>>>>>>>>>>>>>>>>>>')
          await redis.del("series:data")
          const { data } = await axios.put(`http://localhost:4002/tvseries/${args.id}`, args.input)
          console.log('ini data dari service updateSerie', data)
          return [data.value]
        } catch (err) {
          console.log(err)
        }
      }
    }

  }

}


