const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class TvSeriesController {

  static async findSeries(req, res) {
    try {
      const seriesCache = await redis.get("series:data")
      if (seriesCache) {
        console.log('ini dari cache redis')
        res.status(200).json(JSON.parse(seriesCache))
        
      }else{
        const serieData = await axios.get('http://localhost:4002/tvseries')
        redis.set("series:data", JSON.stringify(serieData.data))
        console.log('ini dari axios', serieData.data)
        res.status(200).json(serieData.data)

      } 

    } catch (err) {
      console.log(err)
    }
  }
  static async findSerieById(req, res) {
    try {
      const id = req.params.id
      const seriesCache = await redis.get("series:data")
      const result = JSON.parse(seriesCache).filter(data => data._id === id)
      // console.log(result)
      return res.status(200).json(result)
    }catch (err) {
      console.log(err)
    }
  }
  static async createSerie(req, res) {
    try {
      const newSerie = await req.body
      console.log(newSerie)
      await redis.del("series:data")
      const { data } = await axios.post('http://localhost:4002/tvseries',{newSerie})
      res.status(201).json(data)
    }catch (err) {
      console.log(err)
    }
  }

  static async updateSerie(req, res) {
    try {
      const id = await req.params.id
      const updateSerie = await req.body
      console.log(updateSerie)
      await redis.del("series:data")
      const { data } = await axios.put(`http://localhost:4002/tvseries/${id}`,{updateSerie})
      res.status(201).json(data)
    }catch (err) {
      console.log(err)
    }
  }


  static async deleteSerieById(req, res) {

    try {
      await redis.del("series:data")
      const id = req.params.id 
      console.log(id)
      const {data} = await axios.delete(`http://localhost:4002/tvseries/${id}`)
      res.status(200).json(data)
    }catch (err){
      console.log(err)
    }
  }
}

module.exports = TvSeriesController