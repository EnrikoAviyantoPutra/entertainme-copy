import React  from 'react'
import {useParams} from 'react-router-dom'
import { useQuery} from '@apollo/client'
import DetailMovieCard from '../components/DetailMovieCard'
import {GET_MOVIES_BY_ID} from '../graphQl/index'


export default function DetailMovie() {
  const {id} = useParams()
  const { loading, error, data } = useQuery(GET_MOVIES_BY_ID, {variables:{id}})


  if (loading ) {
    return (
      <>
    <div className='d-flex flex-col justify-content-center align-items-center'>
    <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_x62chJ.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px"}}  loop autoplay>Loading......</lottie-player><br></br>
</div>
      </>
    )
  }
  const detail = data.findMovie[0]
  console.log(data)
  
  return (
    <>
    <center>

    <h1>MOVIE DETAILS</h1>
    </center>
    <DetailMovieCard detail={detail} />


    </>
  )
  
}

