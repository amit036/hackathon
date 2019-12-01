import React from 'react';
import {  MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import axios from 'axios'
import { Link } from 'react-router-dom'

class ChefSignup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            email:"",
            mobile:"",
            gender:"",
            image:"",
            location:"",
            occupation:"",
            password:"",
            look_for_job :""
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }
    hnadleSubmit = (user)=>{
        user.preventDefault()
        console.log(this.state)
        var chefDetails = {
          name:this.state.name,
          email: this.state.email,
          mobile:this.state.mobile,
          gender:this.state.gender,
          image:this.state.image,
          location:this.state.location,
          occupation:this.state.occupation,
          look_for_job:this.state.look_for_job,
          password: this.state.password
      }
      axios.post("http://127.0.0.1:5000/chef/signup", chefDetails)
      .then((response) => {
        console.log(response.data)
                 
      })
      .catch((err) => alert(err))
    }


  render() {
    const smallStyle = { fontSize: '0.8rem'}
    return (
        <form onSubmit = {this.hnadleSubmit} >
        <MDBRow>
        
          <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-5 shadow">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5"><strong>Chef Sign Up</strong></h3>
                </div> 
                <MDBInput label="Your name" group  name = "name" success="right" onChange = {this.handleChange}/>
                <MDBInput label="Your email" group type="email" name = "email" success="right"  onChange = {this.handleChange}/>
                <MDBInput label="Your contect Numbar" type = "number" name="mobile"  success="right"  onChange = {this.handleChange}/>
                <MDBInput label="Gender" group  name = "gender" success="right" onChange = {this.handleChange}/>
                <MDBInput label="Your image link" group name = "image" success="right" onChange = {this.handleChange}/>
                <MDBInput label="Your location" group name = "location"  success="right" onChange = {this.handleChange}/>
                <MDBInput label="occupation"  name = "occupation" group  success="right" onChange = {this.handleChange}/>
                <MDBInput label="Your password" group type="password" validate containerClass="mb-0" name = "password" onChange = {this.handleChange} />
                <div>
                    <select className="browser-default custom-select" name = "look_for_job" onChange = {this.handleChange}>
                    <option selected> Looking for job</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    </select>
                </div>
                <div className="text-center pt-3 mb-3">
                  <MDBBtn type="submit" gradient="blue" rounded className="btn-block z-depth-1a">Sign Up</MDBBtn>
                </div>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="grey-text d-flex justify-content-end" style={smallStyle}>Already Exist? <Link to="/chef/login" className="blue-text ml-1"> Sign In</Link></p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </form>
    );
  }
}

export default ChefSignup;