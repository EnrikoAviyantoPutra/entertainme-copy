import React from 'react'
import { favoritesVar } from '../config/vars'
import Swal from 'sweetalert2'
export default function DetailMovieCard(data) {
  // console.log(data, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ini halaman detail moviecard')
  const {title, poster_path, overview, popularity, tags} = data.detail
console.log(data.detail, '00000000000000000000000000000000000')
  const addFavorite = (payload) => {
    // console.log(payload, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>add favorite")
    const { _id, title, overview, poster_path, popularity, tags } = payload
    const existingFavorites = favoritesVar()
    const newFavorite = {
      _id,
      title,
      poster_path,
      overview,
      popularity,
      tags

    }
    console.log(newFavorite, "><><><<><><><><><><.")
    for (let i = 0; i < existingFavorites.length; i++) {
      if (existingFavorites[i]._id === newFavorite._id) {
        return Swal.fire({
          icon: "warning",
          title: "Already Added to Favorite"
        })

      }
    }
    favoritesVar([newFavorite, ...existingFavorites])
    Swal.fire({
      icon: "success",
      title: "Added to Favorite"
    })
  }

  return (
    <>
    <div className="container">


     <div className='d-flex row bg-dark rounded shadow p-3 mb-5'>
          <div className='col-5' style={{padding: '30px'}}>
          <br></br>
            <img src={poster_path} alt="" style={{ width: '400px' }} />
          </div>
          <div className='col-7 text-white' style={{padding: '10px'}}>
            <div className="col-7">
              <h4> {title} </h4>
              <hr></hr>
              <ul>
                <li>Rating IMDB : {popularity} </li>
                <li>Sinopsis : {overview}</li>
              </ul>
              <br />
              <h4> Genre:</h4>
              <hr></hr>
              <ul>
                {tags.map(genre => (
                  <li>{genre}</li>
                ))}
              </ul>
              <button
                onClick={() =>
                  // <Detail id={hero.id} /> 
                  // console.log(hero.id, 'ini button click')
                  addFavorite(data.detail)
                }
                className="btn btn-primary">Add to Favorite</button>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

