import React from 'react';
import {  MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import { Link,BrowserRouter } from 'react-router-dom'
import axios from 'axios'
class UserLogin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            user_id:""
        }
        
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        var userLogin = {
          email: this.state.email,
          password: this.state.password

      }
      axios.post("http://127.0.0.1:5000/user/login", userLogin)
          .then((response) => {
            this.setState({
              user_id:response.data
          })
          if(this.state.user_id == null){
            alert("Wrong Credential")
          }
          else{
            this.props.setUserId(this.state.user_id)
            this.props.history.push('/users/home')
          }
          })
          .catch((err) => alert(err))
  }
  render() {
    const smallStyle = {fontSize:'0.8rem'}
    return (
        <form onSubmit = {this.handleSubmit}>
        <MDBRow>
          <MDBCol md="9" lg="5" xl="5" className="mx-auto mt-5 shadow">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5"><strong> User Sign in</strong></h3>
                </div>
                <MDBInput label="Your email" group type="email" success="right" name = "email"  onChange = {this.handleChange}/>
                <MDBInput label="Your password" group type="password" validate containerClass="mb-0" name = "password"  onChange = {this.handleChange}/>
                {/* <MDBAutocomplete label="Your country" clear data={countries}/> */}
                <div class="text-center mb-3">
            <button type="submit" class="btn blue-gradient btn-block btn-rounded z-depth-1a">Sign In</button>
          </div>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="grey-text d-flex justify-content-end" style={smallStyle}>New User? <Link to="/users/signup" className="blue-text ml-1"> Sign Up</Link></p>
                
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </form>
    );
  }
}

export default UserLogin;