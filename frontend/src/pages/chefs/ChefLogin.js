import React from 'react';
import {  MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import axios from 'axios'
import { Link } from 'react-router-dom'

class ChefLogin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            chef_id:""
        }
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }
    handleSubmit = (chef) =>{
        chef.preventDefault()
        var resLogin = {
          email: this.state.email,
          password: this.state.password

      }
      axios.post("http://127.0.0.1:5000/chef/login", resLogin)
          .then((response) => {
            console.log(response.data)
            this.setState({
              chef_id:response.data
          })
          if(this.state.chef_id == null)
          {
            alert("Wrong Credential")
          }
          else{
            this.props.setChefId(this.state.chef_id)
            this.props.history.push('/chef/home')
          }
                     
          })
          .catch((err) => alert(err))
    }
  render() {
      console.log(this.state.email)
      console.log(this.state)
    const smallStyle = { fontSize: '0.8rem'}
    return (
        <form onSubmit = {this.handleSubmit}>
        <MDBRow>
          <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3 shadow   ">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5"><strong>Chef Sign in</strong></h3>
                </div>
                <MDBInput label="Your email" group type="email" success="right" name = "email"  onChange = {this.handleChange}/>
                <MDBInput label="Your password" group type="password"  name = "password"  onChange = {this.handleChange}/>
                <div class="text-center mb-3">
            <button type="submit" class="btn blue-gradient btn-block btn-rounded z-depth-1a">Sign In</button>
          </div>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="grey-text d-flex justify-content-end" style={smallStyle}>New User? <Link to="/chef/signup" className="blue-text ml-1"> Sign Up</Link></p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </form>
    );
  }
}

export default ChefLogin;