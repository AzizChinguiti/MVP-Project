import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  //setting a state to take an empty object of title description ....
    const [profil, setProfil] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
      });
      const [error,setError] = useState(false)
      const location = useLocation(); // used to access a sepecific url
      const navigate = useNavigate();
      //extracts id from current ulr path  by retrieving the third segment of the path wich contains id
      const profilId = location.pathname.split("/")[2];
    //here we declare our handlechange 
      const handleChange = (e) => {
        setProfil((previous) => ({ ...previous, [e.target.name]: e.target.value }));
      };
      const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:8800/profile/${profilId}`, profil);
          navigate("/");
        } catch (err) {
          console.log(err);
          setError(true)
        }
      };
    
  return (
    <div className="form">
    <h1>Update Artist Profile</h1>
    <input
      type="text"
      placeholder="Artist Name"
      name="title"
      onChange={handleChange}
    />
    <textarea
      rows={5}
      type="text"
      placeholder="Genre/Description"
      name="desc"
      onChange={handleChange}
    />
    <input
      type="number"
      placeholder="$ Networth $"
      name="networth"
      onChange={handleChange}
    />
    <input
      type="text"
      placeholder="ImageUrl"
      name="cover"
      onChange={handleChange}
    />
    <button className="formButton" onClick={handleClick}>Update</button>
    {error && "Something went wrong!"}
    <Link to="/">See All Artists</Link>
  </div>
  )
}

export default Update