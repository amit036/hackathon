import React from "react";
import { Link } from "react-router-dom";
const NavbarChef = (props) => {
  return (
    <div>
      <nav className="nav sticky-top bg-dark" style={{height:"70px"}}>
        <Link className="nav-item nav-link text-white" to="#"> <h1 style={{ marginLeft: "20px", marginRight: "10px",fontSize: "30px",marginTop:"10px"}}><span><img src="https://img.pixers.pics/pho_wat(s3:700/FO/56/22/38/72/700_FO56223872_de85c7a4feb33992cfe3a05af0832f29.jpg,700,668,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,618,jpg)/wall-murals-chef-cartoon-character.jpg.jpg" style={{height:"30px",width:"30px"}}></img>I'm Chef</span></h1></Link>
        <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "20px",marginLeft:"30px" }} to="/chef/home">Home</Link>
        <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "20px",marginLeft:"30px" }} to="/">Log Out</Link>
        <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "20px",marginLeft:"30px" }} to="/chef/addDish">Add  Dish</Link>
        <Link className="nav-item nav-link text-white mt-3 offset-5" to="#"> Chef ID {props.chefId}</Link>
      </nav>
    </div>
  );
};

export default NavbarChef; 