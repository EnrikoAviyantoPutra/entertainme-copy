import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Movie from '../components/Movie'
import TvSerie from '../components/TvSerie'

const GET_MOVIES_AND_TV_SERIES = gql`
  query getMovies {
    movies{
      _id
      title
      popularity
      poster_path
      tags
    }
    series{
      _id
      title
      popularity
      poster_path
      tags
    }
  } 
`
export default function Home() {
  const { loading, error, data } = useQuery(GET_MOVIES_AND_TV_SERIES)
  console.log(data)
  if (loading) {
    return (
      <h1> INI LAGI LOADING</h1>
    )
  } 
    return (
      <>
        {/* <h1>INI HALAMAN HOME  </h1> */}
        <h2>LIST MOVIES</h2>
        <div className="container d-flex align-items-center">
          {
            data.movies.map((movie) => (
              <Movie key={movie._id} movies={movie} />
            )) 
          }
        </div>
          <h2>LIST TV SERIES</h2>
        <div className="container d-flex align-items-center">
          {
            data.series.map((serie) => (
              <TvSerie key={serie._id} series={serie} />
              
            ))
          }
        </div>
      </>

    )
  }

