import React from 'react'



export default function Movie(data) {
  const movie = data.movies 
  return (
    <>
      <div className="container">
        <div className="card" style={{ width: "18rem" }}>
          <img src={movie.poster_path} class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">{movie.title}</p>
          </div>
        </div>
      </div>
    </>
  )

}

