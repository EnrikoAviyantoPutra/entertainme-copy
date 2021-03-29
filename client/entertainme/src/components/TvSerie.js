import React from 'react'



export default function TvSerie(data) {
  const serie = data.series
  return (
    <>
    <div className="col-lg-3">

      <div className="card card-scale shadow-lg rounded" style={{ width: "18rem" }}>
        <img src={serie.poster_path} class="card-img-top" alt="" style={{height: '65%'}} />
        <div class="card-body">
          <p class="card-text">{serie.title}</p>
        </div>
      </div>
    </div>

    </>
  )

}

