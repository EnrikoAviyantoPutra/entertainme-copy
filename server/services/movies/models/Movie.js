const { ObjectId } = require('bson')
const { getDatabase } = require('../config/mongodb')


class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }

  static create(movie) {
    return getDatabase().collection('movies').insertOne(movie)
  }
  static findId(id) {
    return getDatabase().collection('movies').findOne({ _id: ObjectId(id) })
  }
  static update(id, body) {
    return getDatabase().collection('movies').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: body },
      { returnNewDocument: true }
    )
  }
  static deleteId(id) {
    return getDatabase().collection('movies').deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Movie