import React from 'react'


export default function MovieFavorite(data) {
  const { poster_path, title, popularity } = data.movieFav
  console.log(data)
  console.log(poster_path, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  return (
    <>
      <div className="card mt-3  shadow-lg rounded" style={{ width: '16rem' }}>
        <img src={poster_path} className="card-img-top" alt="" style={{ height: '65%' }} />
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">{title}</h5>
          {/* <p className="card-text">Race: {hero.appearance.race}</p> */}
          <p className="card-text">Rating: {popularity}</p>
        </div>
        <div className='d-flex flex-row' style={{ padding: '2px', marginLeft: '10px' }}>

        </div>
      </div>

    </>
  )


}