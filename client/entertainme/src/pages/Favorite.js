import { useReactiveVar } from '@apollo/client'
import { favoritesVar } from '../config/vars'
import React from 'react'
import MovieFavorite from '../components/MovieFavorite'

export default function Favorite() {
  const favoriteMovie = useReactiveVar(favoritesVar)


  return (  
    <>
    <center>
      <h1> Watch List </h1>

    </center>

      <div className="container">
        <div className="row mb-2 mt-2">
          {favoriteMovie.map((favorite) => (
            <MovieFavorite key={favorite._id} movieFav={favorite} />
          ))

          }
        </div>
      </div>
    </>
  )
}