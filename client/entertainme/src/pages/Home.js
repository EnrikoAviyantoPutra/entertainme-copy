import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_MOVIES_AND_TV_SERIES } from '../graphQl/index'
import Movie from '../components/Movie'
import TvSerie from '../components/TvSerie'


export default function Home() {
  const { loading, error, data } = useQuery(GET_MOVIES_AND_TV_SERIES)

  console.log(data)
  if (loading) {
    return (
      <>
        <div className='d-flex flex-col justify-content-center align-items-center'>

          <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_x62chJ.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay>Loading......</lottie-player><br></br>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <h1>{error.message}</h1>
      </>
    )

  }
  return (
    <>
      {/* <h1>INI HALAMAN HOME  </h1> */}
      <center>
      <h2>LIST MOVIES</h2>

      </center>
      <div className="container">
      <div className="row mb-2 mt-2">
          {
            data.movies.map((movie) => (
              <Movie key={movie._id} movies={movie} />
            ))
          }
        </div>
      </div><hr></hr>
      <center>
      <h2>LIST TV SERIES</h2>

      </center>
      <div className="container">
        <div className="row mb-2 mt-2">
          {
            data.series.map((serie) => (
              <TvSerie key={serie._id} series={serie} />

            ))
          }
        </div>
      </div>
    </>

  )
}

