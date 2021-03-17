import {  gql } from '@apollo/client'

export const GET_MOVIES_AND_TV_SERIES = gql`
query getMovies {
  movies{
    _id
    title
    popularity
    overview
    poster_path
    tags
  }
  series{
    _id
    title
    popularity
    overview
    poster_path
    tags
  }
} 
`

export const GET_MOVIES_BY_ID = gql`
query findMovie($id: ID!){
  findMovie(id: $id){
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}
`

export const ADD_MOVIE = gql`
mutation addMovie($movieData: movie ) {
createMovie(input: $movieData) {
  _id
  title
  overview
  poster_path
  popularity
  tags
}
}
` 

export const UPDATE_MOVIE = gql`
mutation editMovie($movieId: ID!, $movieData: movie) {
  updateMovie(id: $movieId, input: $movieData) {
    title
    overview
    poster_path
    popularity
    tags
    
  }
}

`


export const DELETE_MOVIE = gql`
mutation removeMovie($delMovie: ID!) {
  deleteMovie(id: $delMovie){
    message
  }
}
`