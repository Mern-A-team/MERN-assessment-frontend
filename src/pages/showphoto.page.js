import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SideNav from '../components/navigation/navbar.component'
import StaticNav from '../components/navigation/staticnav.component'
import '../styles/pages/showphoto.page.scss'

import API from '../axios.config'

export default function ShowPhoto(props) {

    const [data, setData] = useState()

    useEffect(() => {
      GetPhoto()
      // eslint-disable-next-line
    }, [])

    const GetPhoto = () => {
      API.get(`/photos/${props.match.params.id}`, {

      })
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }


    return (
      <>
        <SideNav />
        <StaticNav />
        { data && 
          <>
            <h2>{data.name}</h2>
            <p>ID Number: {data.idNumber}</p>
            <p>Location: {data.location}</p>
            <p>Categories: {data.category.join(", ")}</p>
            <p>Description: {data.description}</p>
            <Link to={{pathname: `/photo/${props.match.params.id}/edit`, 
            state: {
              data: data
            }
            }}>Edit</Link>
          </>
        }
      </>
    )
  }

