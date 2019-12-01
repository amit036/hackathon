import React from 'react';
import {  MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import axios from 'axios'
import { Link } from 'react-router-dom'

class UserSignup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            email:"",
            mobile:"",
            image:"",
            password:"",
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }
    handleSubmit = (user)=>{
        user.preventDefault()
        var userDetails = {
          name:this.state.name,
          email: this.state.email,
          mobile:this.state.mobile,
          image:this.state.image,
          password: this.state.password

      }
      console.log(this.state.password)
      axios.post("http://127.0.0.1:5000/user/signup", userDetails)
      .then((response) => {
        console.log(response.data)
                 
      })
      .catch((err) => alert(err))
    }
    


  render() {
    const smallStyle = { fontSize: '0.8rem'}
    return (
        <form onSubmit = {this.handleSubmit} >
        <MDBRow>
        
          <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-5 shadow ">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5"><strong> User Sign Up</strong></h3>
                </div> 
                <MDBInput label="Your name" group  name = "name" success="right" onChange = {this.handleChange}/>
                <MDBInput label="Your email" group type="email" name = "email" success="right"  onChange = {this.handleChange}/>
                <MDBInput label="Your contect Numbar" type = "number" name="mobile"  success="right"  onChange = {this.handleChange}/>
                <MDBInput label="Your image link" group name = "image" success="right" onChange = {this.handleChange}/>
                 <MDBInput label="Your password" type="password" name="password" containerClass="mb-0"  onChange = {this.handleChange}/>
                <div className="text-center pt-3 mb-3">
                  <MDBBtn type="submit" gradient="blue" rounded className="btn-block z-depth-1a">Sign Up</MDBBtn>
                </div>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="grey-text d-flex justify-content-end" style={smallStyle}>Already Exist? <Link to="/users/login" className="blue-text ml-1"> Sign In</Link></p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </form>
    );
  }
}

export default UserSignup;