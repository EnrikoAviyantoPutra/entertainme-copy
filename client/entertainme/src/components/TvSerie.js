import React from 'react'



export default function TvSerie(data) {
  const serie = data.series
  return (
    <>
      <div className="container" key={serie._id}>
        <div className="card" style={{ width: "18rem" }}>
          <img src={serie.poster_path} class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">{serie.title}</p>
          </div>
        </div>
      </div>
    </>
  )

}

