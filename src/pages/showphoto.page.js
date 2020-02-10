import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideNav from "../components/navigation/navbar.component";
import StaticNav from "../components/navigation/staticnav.component";
import "../styles/pages/showphoto.page.scss";

import API from '../axios.config'


export default function ShowPhoto(props) {
  const [data, setData] = useState();

  useEffect(() => {
    GetPhoto();
    // eslint-disable-next-line
  }, []);

  // API call to get the photo and it's details.
  const GetPhoto = () => {
    API.get(`/photos/${props.match.params.id}`, {})
      .then(res => {setData(res.data)
      console.log(res.data.fileRef) }
      )
      .catch(err => console.log(err));
  };


  return (
    <>
      <SideNav />
      <StaticNav />
      {data && (
        <div id="showContainer">

          <img id="photo" src={`https://archivise.imgix.net/${data.fileName}?auto=compress&w=500&q=50`}/>
          <h2>{data.name}</h2>
          <p><span>ID Number:</span> {data.idNumber}</p>
          <p><span>Location:</span> {data.location}</p>
          <p><span>Categories:</span> {data.category.join(", ")}</p>
          <p><span>Description:</span> {data.description}</p>
          {(props.userRole === "admin" || props.userRole === "volunteer") &&
              <Link
                id="button"
                to={{
                  pathname: `/photo/${props.match.params.id}/edit`,
                  state: {
                    data: data
                  }
                }}
              >
                Edit
              </Link>
          }
          <br/>
          <br/>
          <Link type="button" to={{pathname: `/search`}}>Back to photos</Link>
        </div>
      )}
    </>
  );
}
