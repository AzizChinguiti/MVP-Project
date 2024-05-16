import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedProfile, setClickedProfile] = useState(null);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:8800/profile");
        setProfiles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProfiles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/profile/${id}`);
      setProfiles(profiles.filter(profile => profile.id !== id));
      // resetingclicked profile to null after deleting it
      setClickedProfile(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfileClick = (id) => {
    const clickedProfile = profiles.find(profile => profile.id === id);
    setClickedProfile(clickedProfile);
  };

  const handleTitleClick = () => {
    setClickedProfile(null);
  };
// i only made it filter elements based on their titles wether they were upper or lower case and add it in the profiles array
  const filteredProfiles = profiles.filter(profile => {
    return profile.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSort = () => {
    const sortedProfiles = [...profiles].sort((a, b) => a.title.localeCompare(b.title));
    setProfiles(sortedProfiles);
  };
// i used ternary operator to handel 2 cases after button click 
//first case If clickedProfile exists,it renders detailed information about that profile, like its title &description& net worth& &the options to delete or update it
//second case If clickedProfile is not present (meaning the user hasn't clicked on a specific profile or One profile),it renders a list of profiles with options for sorting,adding new profiles,and searching by name in the nav bar
  return (
    <div>
      {clickedProfile ? (
        <div>
          <h1 onClick={handleTitleClick} className="title">Return Home</h1>
          <div className="profile">
            <div key={clickedProfile.id} className="profil">
              <img src={clickedProfile.cover} alt="" />
              <h2 className='pname'>{clickedProfile.title}</h2>
              <p className='pdesc'>{clickedProfile.desc}</p>
              <span className='pnet'>${clickedProfile.networth}</span>
              <button className="delete" onClick={() => handleDelete(clickedProfile.id)}>Delete</button>
              <Link
                to={`/update/${clickedProfile.id}`} // Pass profile id to update route
                className="update"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img src={logo} alt="Artists" className="logo-img" />
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/contact" className="contact">Contact Us</Link>
              </li>
              <li>
                {/* <Link to="/favorites" className="favorites">Favorites</Link> */}
              </li>
            </ul>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          
          </nav>
          <button onClick={handleSort} className='sort-btn'>Sort by Name</button>  <button className="sort-btn">
            <Link to="/add" className='addbtn'>
              Add new Artist
            </Link>
          </button> 
          <div className="profile">
            {filteredProfiles.map((profile) => (
              <div key={profile.id} className="profil" onClick={() => handleProfileClick(profile.id)}>
                <img src={profile.cover} alt="" />
                <h2 className='pname'>{profile.title}</h2>
                <p className='pdesc'>{profile.desc}</p>
                <span className='pnet'>${profile.networth}</span>
                <button className="delete" onClick={() => handleDelete(profile.id)}>Delete</button>
                <Link
                  to={`/update/${profile.id}`} // Pass profile id to update route
                  className="update"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
