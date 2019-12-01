import React from 'react';
import {  MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import axios from 'axios'
import { Link } from 'react-router-dom'

class RestuarentSignup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            email:"",
            mobile:"",
            password:""
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }
    handleSubmit = (res)=>{
        res.preventDefault()
        console.log(this.state)
        var resDetails = {
            name:this.state.name,
            email: this.state.email,
            mobile:this.state.mobile,
            password: this.state.password
  
        }
        axios.post("http://127.0.0.1:5000/restuarent/signup", resDetails)
        .then((response) => {
          console.log(response.data)
                   
        })
        .catch((err) => alert(err))
    }


  render() {
      console.log(this.state.name)
    const smallStyle = { fontSize: '0.8rem'}
    return (
        <form onSubmit = {this.handleSubmit} >
        <MDBRow>
        
          <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-5 shadow">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5"><strong>Sign Up</strong></h3>
                </div> 
                <MDBInput label="Restuarent Name" group  name ="name" success="right" onChange = {this.handleChange}/>
                <MDBInput label="Email" group type="email" name = "email" success="right"  onChange = {this.handleChange}/>
                <MDBInput label="Mobile Numbar" group type = "number" name="mobile"  success="right"  onChange = {this.handleChange}/>
                <MDBInput label="Your password" group type="password" validate containerClass="mb-0" name = "password" onChange = {this.handleChange} />
                <div className="text-center pt-3 mb-3">
                  <MDBBtn type="submit" gradient="blue" rounded className="btn-block z-depth-1a">Sign Up</MDBBtn>
                </div>
                <p className="grey-text d-flex justify-content-end" style={smallStyle}>Already Exist? <Link to="/restuarent/login" className="blue-text ml-1"> Sign In</Link></p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </form>
    );
  }
}

export default RestuarentSignup;