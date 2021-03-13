const Movie = require('../models/Movie')

class MovieController {
  static async find(req, res) {
    try {
      const movies = await Movie.find()
      res.json(movies)

    } catch (err) {
      console.log(err)

    }
  }
  static async findId(req, res) {
    const id = req.params.id
    try {
      const movies = await Movie.findId(id)
      res.json(movies)
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
      const movies = await Movie.update(id, body)
      res.json(movies)

    } catch (err) {
      console.log(err);
    }
  }
  static async create(req, res) {
    try {
      const movie = await Movie.create(req.body)
      res.json(movie)

    } catch (err) {
      console.log(err);
    }
  }
  static async deleteId(req,res) {
    const id = req.params.id
    try {
      const movie = await Movie.deleteId(id)
      res.json(movie)

    }catch(err) {
      console.log(err)
    }
  }
}

module.exports = MovieController