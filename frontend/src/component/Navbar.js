import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
        <Link to="/users/login"><button className="btn btn-primary">User</button></Link>
        <Link to="/chef/login"><button className="btn btn-primary">Chef</button></Link>
        <Link to="/restuarent/login"><button className="btn btn-primary">Restaurant</button></Link>
        
    </div>
  );
};
export default Navbar; 