const { ObjectId } = require('bson')
const { getDatabase } = require('../config/mongodb')


class TvSerie {
  static find() {
    return getDatabase().collection('tvSeries').find().toArray()
  }

  static create(tvserie) {
    return getDatabase().collection('tvSeries').insertOne(tvserie)
  }
  static findId(id) {
    return getDatabase().collection('tvSeries').findOne({_id: ObjectId(id)})
  }
  static update(id, body) {
    return getDatabase().collection('tvSeries').updateOne(
      { _id: ObjectId(id) },
      { $set: body }
    )
  }
  static deleteId(id) {
    return getDatabase().collection('tvSeries').deleteOne({_id: ObjectId(id)})
  }
}

module.exports = TvSerie