import React from "react";
import { Link } from "react-router-dom";
const NavbarUser = (props) => {
  return (
    <div>
      <nav className="nav sticky-top mt-3 bg-danger" style={{height:"70px"}}>
        <Link className="nav-item nav-link text-white" to="#"> <h1 style={{ marginLeft: "20px", marginRight: "10px",fontSize: "30px",marginTop:"10px"}}><span>I'm Chef</span></h1></Link>
        <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "20px",marginLeft:"30px" }} to="/users/home">Home</Link>
        <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "20px",marginLeft:"30px" }} to="/">Log Out</Link>
        <Link className="nav-item nav-link text-white mt-3 offset-5" to="#"> User ID: {props.username}</Link>
      </nav>
    </div>
  );
};
export default NavbarUser; 