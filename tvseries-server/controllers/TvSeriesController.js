const TvSerie = require('../models/TvSerie')

class TvSeriesController {
  static async find(req, res) {
    try {
      const tvSeries = await TvSerie.find()
      res.json(tvSeries)

    } catch (err) {
      console.log(err)

    }
  }
  static async findId(req, res) {
    const id = req.params.id
    try {
      const tvSeries = await TvSerie.findId(id)
      res.json(tvSeries)
    } catch (err) {
      console.log(err)
    }
  }

  static async update(req, res) {
    const id = req.params.id
    const body = req.body
    console.log(id)
    console.log(body)
    try {
      const tvSeries = await TvSerie.update(id, body)
      res.json(tvSeries)

    } catch (err) {
      console.log(err);
    }
  }
  static async create(req, res) {
    try {
      const tvSerie = await TvSerie.create(req.body)
      res.json(tvSerie)

    } catch (err) {
      console.log(err);
    }
  }
  static async deleteId(req,res) {
    const id = req.params.id
    try {
      const tvSerie = await TvSerie.deleteId(id)
      res.json(tvSerie)

    }catch(err) {
      console.log(err)
    }
  }
}

module.exports = TvSeriesController