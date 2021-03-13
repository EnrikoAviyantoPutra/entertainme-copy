const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class EntertainmeMovies {
  static async find(req, res) {
    try {
      const moviesCache = await redis.get("movies:data")
      const tvSeriesCache = await redis.get("tvSeries:data")
      if (moviesCache && tvSeriesCache) {
        console.log('ini dari cache redis');
        res.status(200).json({
          movie: JSON.parse(moviesCache),
          tvSeries: JSON.parse(tvSeriesCache)
        })
        
      }else{
        const moviesData = await axios.get('http://localhost:4001/movies')
        const tvSeriesData = await axios.get('http://localhost:4002/tvseries')
        redis.set("movies:data", JSON.stringify(moviesData.data))
        redis.set("tvSeries:data", JSON.stringify(tvSeriesData.data))
        console.log(moviesData, tvSeriesData, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        res.status(200).json({
          movie: moviesData.data,
          tvSeries: tvSeriesData.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  // static async findMovies(req, res) {
  //   try {
  //     const moviesCache = await redis.get("movies:data")
  //     if (moviesCache) {
  //       console.log('ini dari cache redis')
  //       res.status(200).json(JSON.parse(moviesCache))
        
  //     }else{
  //       const moviesData = await axios.get('http://localhost:4001/movies')
  //       redis.set("movies:data", JSON.stringify(moviesData.data))
  //       console.log('ini dari axios', moviesData.data)
  //       res.status(200).json(moviesData.data)

  //     } 

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // static async findMoviesById(req, res) {
  //   try {
  //     const id = req.params.id
  //     const moviesCache = await redis.get("movies:data")
  //     const result = JSON.parse(moviesCache).filter(data => data._id === id)
  //     // console.log(result)
  //     return res.status(200).json(result)
  //   }catch (err) {
  //     console.log(err)
  //   }
  // }
  // static async createMovies(req, res) {
  //   try {
  //     const newMovie = await req.body
  //     console.log(newMovie)
  //     await redis.del("movies:data")
  //     const { data } = await axios.post('http://localhost:4001/movies',{newMovie})
  //     res.status(201).json(data)
  //   }catch (err) {
  //     console.log(err)
  //   }
  // }

  // static async updateMovie(req, res) {
  //   try {
  //     const id = await req.params.id
  //     const updateMovie = await req.body
  //     console.log(updateMovie)
  //     await redis.del("movies:data")
  //     const { data } = await axios.put(`http://localhost:4001/movies/${id}`,{updateMovie})
  //     res.status(201).json(data)
  //   }catch (err) {
  //     console.log(err)
  //   }
  // }




  // static async deleteMoviesById(req, res) {

  //   try {
  //     await redis.del("movies:data")
  //     const id = req.params.id 
  //     console.log(id)
  //     const {data} = await axios.delete(`http://localhost:4001/movies/${id}`)
  //     res.status(200).json(data)
  //   }catch (err){
  //     console.log(err)
  //   }
  // }
}

module.exports = EntertainmeMovies