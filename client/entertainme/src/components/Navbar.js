import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import {useMutation} from '@apollo/client'
import {GET_MOVIES_AND_TV_SERIES, ADD_MOVIE} from '../graphQl/index'

export default function Navbar() {
  const [addMovie, { data }] = useMutation(ADD_MOVIE)
  const history = useHistory()
  const location = useLocation()

  console.log(location.pathname, '??????????????????????????????????????????????????');

  const page = (payload) => {
    history.push(`${payload}`)
  }

  const add = (payload) => {
    Swal.fire({
      title: `Add ${payload}`,
      html: `
      <label class="margin-left">Title:</label>
      <hr></hr>
      <input type="text" id="title" class="swal2-input" value="">
      <label class="margin-left">Poster Path:</label><br>
      <hr></hr>
      <input type="text" id="posterPath" class="swal2-input" value="">
      <label class="margin-left">Popularity:</label><br>
      <hr></hr>
      <input type="number" id="popularity" class="swal2-input" value=""><br>
      <label class="margin-left">Overview:</label><br>
      <hr></hr>
      <textarea id="overview" class="swal2-input" rows="4" cols="50" value=""></textarea>
      <label class="margin-left">Genre:</label><br>
      <hr></hr>
      <div class="container"> 
      <div class="d-flex justify-content-md-evenly flex-wrap">
      <div class="form-check">
      <input class="form-check-input" type="checkbox" value="action" id="action" >
      <label class="form-check-label" for="flexCheckAction">
        action
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="romance" id="romance">
      <label class="form-check-label" for="flexCheckRomance">
        romance
      </label>
    </div>
    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="horror" id="horror" >
    <label class="form-check-label" for="flexCheckRomance">
      horror
    </label>
  </div>
  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="comedy" id="comedy">
  <label class="form-check-label" for="flexCheckComedy">
    comedy
  </label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="drama" id="drama">
<label class="form-check-label" for="flexCheckDrama">
  drama
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="family" id="family">
<label class="form-check-label" for="flexCheckFamily">
  family
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="scienceFiction" id="scienceFiction">
<label class="form-check-label" for="flexCheckSciFi">
  scienceFiction
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="animation" id="animation">
<label class="form-check-label" for="flexCheckAnimation">
  animation
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="documenter" id="documenter">
<label class="form-check-label" for="flexCheckDocumenter">
  documenter
</label>
</div>
</div>
    </div>
      `,
      confirmButtonText: "Add Movie",
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
        console.log(tags, '>>>>>>>>>>>>>')

        return { title, overview, poster_path, popularity, tags }
      }
    })
      .then((result) => {
        console.log(result)
        if (result.isDismissed === false) {
          addMovie({variables: { movieData: result.value}, refetchQueries: [{ query: GET_MOVIES_AND_TV_SERIES}]})
          Swal.fire({
            icon: "success",
            text: "Success Create Movie"
          })
          
        }
        

      })





  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-warning">
        <div class="container-fluid">
        <img src="https://img.icons8.com/wired/64/000000/starred-ticket.png"/>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                {/* <a class="nav-link active text-white" aria-current="page" href="#!">Home</a> */}
                <button className="btn text-white" onClick={() => page('/')}>Home</button>
                <button className="btn text-white" onClick={() => page('/favorite')}>Favorite</button>
                {
                  location.pathname === '/' ?<button className="btn text-white" onClick={() => add('movie')}>Add Movies</button>:''
                }

              </li>
              <li class="nav-item">
                {/* <a class="nav-link active text-white" aria-current="page" href="#!">Favorite</a> */}
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )

}