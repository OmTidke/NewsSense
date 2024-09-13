import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import logo from "../assets/logo.jpg";
import profileImg from "../assets/profileImg.png"
import { userContext } from "../App";
import axios from "axios";

import { NavLink, useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const user = useContext(userContext);

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  // Function to toggle the visibility of the popover
  const togglePopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    axios.get('http://localhost:4001/logout')
      .then(res => {
        if (res.data === "logged out")
          navigate('/login')
        navigate(0)
      }).catch(err => console.log(err))
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="main-nav container-fluid">
          <NavLink to="/" className="company-logo">
            <img src={logo} alt="company logo"></img>
          </NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {/* general
        business
        entertainment
        health
        science
        sports
        technology */}
              <li className="hover-link nav-item" id="general">
                <NavLink to="/" className="hover-link nav-item" activeClassName="active-link">General</NavLink>
              </li>

              <li className="hover-link nav-item" id="business">
                <NavLink to="/business" className="hover-link nav-item" activeClassName="active-link">Business</NavLink>
              </li>

              <li className="hover-link nav-item" id="sports">
                <NavLink to="/sports" className="hover-link nav-item" activeClassName="active-link">Sports</NavLink>
              </li>

              <li className="hover-link nav-item" id="entertainment">
                <NavLink to="/entertainment" className="hover-link nav-item" activeClassName="active-link">Entertainment</NavLink>
              </li>

              <li className="hover-link nav-item" id="health">
                <NavLink to="/health" className="hover-link nav-item" activeClassName="active-link">Health</NavLink>
              </li>

              <li className="hover-link nav-item" id="science">
                <NavLink to="/science" className="hover-link nav-item" activeClassName="active-link">Science</NavLink>
              </li>

              <li className="hover-link nav-item" id="technology">
                <NavLink to="/technology" className="hover-link nav-item" activeClassName="active-link">Technology</NavLink>
              </li>

              <div className="search-bar flex">
                <input id="search-text" type="text" className="news-input" placeholder="e.g. Science"></input>
                <button id="search-button" className="search-button">
                  Search
                </button>
              </div>
              <div className="">
                {user.firstName ? (
                  <div>
                    <button className="btn-success profile-btn" onClick={togglePopover}>
                      <img src={profileImg} alt="user" className="profile-image"></img>
                    </button>
                    {isPopoverVisible && (
                      <div className="popover-container">
                        <div className="container">
                          <ul>
                            <h5 className="menuListItem">{user.firstName + " " + user.lastName}</h5>
                            <li className="menuListItem">
                              <Link to="/preferences">
                                For Me
                              </Link>
                            </li>
                            <li className="menuListItem">
                              <Link to="/SavedNews" >Saved News</Link>
                            </li>
                            <li onClick={handleLogout} className="menuListItem">Logout</li>
                          </ul>

                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink to="login">
                    <button className="btn btn-success login-btn">SignIn</button>
                  </NavLink>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}