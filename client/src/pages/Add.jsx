import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
    const [profil, setProfil] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
      });
      const [error,setError] = useState(false)

      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setProfil((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8800/profile", profil);
          navigate("/");
        } catch (err) {
          console.log(err);
          setError(true)
        }
      };
    
  return (
    
    <div className="form">
    <h1 className="title">New Artist Profile</h1>
    <input
      type="text"
      placeholder="Name of Artist"
      name="title"
      onChange={handleChange}
    />
    <textarea
   
      type="text"
      placeholder="Genre/Description"
      name="desc"
      onChange={handleChange}
    />
    <input
      type="number"
      placeholder="-Networth-"
      name="networth"
      onChange={handleChange}
    />
    <input
      type="text"
      placeholder="ImageURL"
      name="cover"
      onChange={handleChange}
    />
    <button className="formButton" onClick={handleClick}>Add</button>
    {error && "Something went wrong!"}
    <Link to="/" className="seeAllArtists">See All Artists</Link>
  </div>
 
  )
}

export default Add