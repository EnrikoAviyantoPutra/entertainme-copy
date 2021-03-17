import React from 'react'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { favoritesVar } from '../config/vars'
import { GET_MOVIES_AND_TV_SERIES, UPDATE_MOVIE, DELETE_MOVIE } from '../graphQl/index'


export default function Movie(data) {
  const history = useHistory()
  const [removeMovie, { data: moviesData }] = useMutation(DELETE_MOVIE)
  const [editMovie, { data: updateMovieData }] = useMutation(UPDATE_MOVIE)
  const movie = data.movies

  const update = (payload) => {
    console.log(payload.overview, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    function check(data) {
      for (const i of payload.tags) {
        console.log(i);
        if (i === data) {
          console.log(true)
          return 'checked'
        }

      }

    }

    Swal.fire({
      title: `Edit Movie`,
      html: `
        <label class="margin-left">Title:</label>
        <hr></hr>
        <input type="text" id="title" class="swal2-input"  value="${payload.title}">
        <label class="margin-left">Poster Path:</label><br>
        <hr></hr>
        <input type="text" id="posterPath" class="swal2-input" value="${payload.poster_path}">
        <label class="margin-left">Popularity:</label><br>
        <hr></hr>
        <input type="number" id="popularity" class="swal2-input" value="${payload.popularity}"><br>
        <label class="margin-left">Overview:</label><br>
        <hr></hr>
        <textarea id="overview" class="swal2-input" rows="4" cols="50" value="${payload.overview}">${payload.overview}</textarea>
        <label class="margin-left">Genre:</label><br>
        <hr></hr>
        <div class="container"> 
        <div class="d-flex justify-content-md-evenly flex-wrap">
        <div class="form-check">
        <label class="form-check-label margin-left" for="flexCheckAction">
          action
        </label>
        <input class="form-check-input" type="checkbox" value="action" id="action" ${check("action")}>
      </div>
      <div class="form-check">
      <label class="form-check-label" for="flexCheckRomance">
        romance
      </label>
        <input class="form-check-input" type="checkbox" value="romance" id="romance" ${check("romance")}>
      </div>
      <div class="form-check">
      <label class="form-check-label" for="flexCheckRomance">
        horror
      </label>
      <input class="form-check-input" type="checkbox" value="horror" id="horror" ${check("horror")}>
    </div>
    <div class="form-check">
    <label class="form-check-label" for="flexCheckComedy">
      comedy
    </label>
    <input class="form-check-input" type="checkbox" value="comedy" id="comedy" ${check("comedy")}>
  </div>
  <div class="form-check">
  <label class="form-check-label" for="flexCheckDrama">
    drama
  </label>
  <input class="form-check-input" type="checkbox" value="drama" id="drama" ${check("drama")}>
  </div>
  <div class="form-check">
  <label class="form-check-label" for="flexCheckFamily">
    family
  </label>
  <input class="form-check-input" type="checkbox" value="family" id="family" ${check("family")}>
  </div>
  <div class="form-check">
  <label class="form-check-label" for="flexCheckSciFi">
    scienceFiction
  </label>
  <input class="form-check-input" type="checkbox" value="scienceFiction" id="scienceFiction" ${check("scienceFiction")}>
  </div>
  <div class="form-check">
  <label class="form-check-label" for="flexCheckAnimation">
    animation
  </label>
  <input class="form-check-input" type="checkbox" value="animation" id="animation" ${check("animation")}>
  </div>
  <div class="form-check">
  <label class="form-check-label" for="flexCheckDocumenter">
    documenter
  </label>
  <input class="form-check-input" type="checkbox" value="documenter" id="documenter" ${check("documenter")}>
  </div>
  </div>
      </div>
        `,
      confirmButtonText: "Update Movie",
      focusConfirm: false,
      preConfirm: () => {
        let tags = []
        let tagsResult = []
        const title = Swal.getPopup().querySelector("#title").value
        const overview = Swal.getPopup().querySelector("#overview").value
        const poster_path = Swal.getPopup().querySelector("#posterPath").value
        const stringPopularity = Swal.getPopup().querySelector("#popularity").value
        const popularity = +stringPopularity
        const action = {
          value: Swal.getPopup().querySelector("#action").value,
          checked: Swal.getPopup().querySelector("#action").checked
        }
        payload.tags.forEach((e) => {
          console.log(e, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        })
        const romance = {
          value: Swal.getPopup().querySelector("#romance").value,
          checked: Swal.getPopup().querySelector("#romance").checked
        }
        const horror = {
          value: Swal.getPopup().querySelector("#horror").value,
          checked: Swal.getPopup().querySelector("#horror").checked
        }
        const comedy = {
          value: Swal.getPopup().querySelector("#comedy").value,
          checked: Swal.getPopup().querySelector("#comedy").checked
        }
        const drama = {
          value: Swal.getPopup().querySelector("#drama").value,
          checked: Swal.getPopup().querySelector("#drama").checked
        }
        const family = {
          value: Swal.getPopup().querySelector("#family").value,
          checked: Swal.getPopup().querySelector("#family").checked
        }
        const scienceFiction = {
          value: Swal.getPopup().querySelector("#scienceFiction").value,
          checked: Swal.getPopup().querySelector("#scienceFiction").checked
        }
        const animation = {
          value: Swal.getPopup().querySelector("#animation").value,
          checked: Swal.getPopup().querySelector("#animation").checked
        }
        const documenter = {
          value: Swal.getPopup().querySelector("#documenter").value,
          checked: Swal.getPopup().querySelector("#documenter").checked
        }

        tagsResult.push(action, romance, horror, comedy, drama, family, scienceFiction, animation, documenter)
        tagsResult.forEach(e => {
          if (e.checked === true) {
            tags.push(e.value)
          }

        })

        return { title, overview, poster_path, popularity, tags }
      }
    })
      .then((result) => {
        console.log(result)
        if (result.isDismissed === false) {
          editMovie({ variables: { movieId: payload._id, movieData: result.value }, refetchQueries: [{ query: GET_MOVIES_AND_TV_SERIES }] })
          Swal.fire({
            icon: "success",
            text: "Success Update Movie"
          })
        }

      })

  }
  const detail = (payload) => {
    console.log(payload)
    history.push({
      pathname: `/detail/${payload._id}`,
      state: { detail: payload }
    })
  }


  const deleteMovie = (payload) => {
    console.log(payload, 'masuk')
    removeMovie({ variables: { delMovie: payload }, refetchQueries: [{ query: GET_MOVIES_AND_TV_SERIES }] })
  }

  const addFavorite = (payload) => {
    console.log(payload, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>add favorite")
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
      <div className="col-lg-3">
        <div className="card mt-3 shadow-lg rounded card-scale" style={{ width: '16rem', position: 'relative' }}>
          <div>
            <img src={movie.poster_path} className="card-img-top" alt="" style={{ height: '65%' }} />
            <div className="d-flex justify-content-evenly">

              <button
                onClick={() =>
                  detail(movie)
                }
                className="btn btn-info mb-2 mt-2 ml-2 mr-2" test-id="detail">Detail</button>

              <button
                onClick={() =>
                  update(movie)
                }
                className="btn btn-dark mb-2 mt-2 ml-2 mr-2" test-id="detail">Update</button>

              <img src="https://img.icons8.com/cotton/64/000000/like.png" style={{ height: 40, cursor: 'pointer', position: "absolute", left: 0, top: 0 }} onClick={() =>
                addFavorite(movie)
              } alt='' />

              <img src="https://img.icons8.com/fluent/48/000000/delete-forever.png" onClick={() => deleteMovie(movie._id)} style={{ height: 30, cursor: "pointer", position: "absolute", right: 0, top: 0 }} alt="" />
              {/* <img src="https://img.icons8.com/fluent/48/000000/star.png" style={{ height: 30, cursor: "pointer", position: "absolute", right: 0 }} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

