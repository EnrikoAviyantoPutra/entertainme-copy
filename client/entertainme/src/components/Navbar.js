import React from 'react'
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Navbar() {
  const history = useHistory()

  const page = (payload) =>{
    history.push(`${payload}`)
  }

  const add = (payload) => {
    Swal.fire({
      title: `Add ${payload}`,
      html: `
      <label class="margin-left">Title:</label>
      <input type="text" id="title" class="swal2-input" value="">
      <label class="margin-left">Poster Path:</label><br>
      <input type="text" id="posterPath" class="swal2-input" value="">
      <label class="margin-left">Popularity:</label><br>
      <input type="number" id="popularity" class="swal2-input" value=""><br>
      <label class="margin-left">Overview:</label><br>
      <textarea id="overview" class="swal2-input" rows="4" cols="50" value=""></textarea>
      <label class="margin-left">Tags:</label><br>
      <div class="d-flex flex-col justify-content-around">
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
  <label class="form-check-label" for="flexCheckcomedy">
    comedy
  </label>
</div>
    </div>
      `,
      confirmButtonText: "Add Movie",
      focusConfirm: false,
      preConfirm: () => {
        let tags = []
        let tagsResult = []
        const title = Swal.getPopup().querySelector("#title").value;
        const overview = Swal.getPopup().querySelector("#overview").value
        const posterPath = Swal.getPopup().querySelector("#posterPath").value
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
        tags.push(action,romance,horror,comedy)

        tags.forEach(e => {
          if (e.checked === true) {
            tagsResult.push(e.value) 
          }
          
        })
        console.log(tagsResult, '>>>>>>>>>>>>>')

        return { title, overview, posterPath, popularity, tagsResult }
      }
    })
    .then((result) => {
      console.log(result)
    })

  }

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="container-fluid">
        <img src="https://img.icons8.com/color/48/000000/batman.png" alt=''/ >
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                {/* <a class="nav-link active text-white" aria-current="page" href="#!">Home</a> */}
                <button className="btn text-white" onClick={() => page ('')}>Home</button>
                <button className="btn text-white" onClick={() => page ('favorite')}>Favorite</button>
                <button className="btn text-white" onClick={() => add ('movie')}>Add Movies</button>
                <button className="btn text-white" onClick={() => add ('serie')}>Add TV Series</button>


              </li>
              <li class="nav-item">
                {/* <a class="nav-link active text-white" aria-current="page" href="#!">Favorite</a> */}
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success text-white" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
  
}