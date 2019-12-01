import React from 'react';
import {  MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import axios from 'axios'
import { Link } from 'react-router-dom'

class RestuarentLogin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            res_id:""
        }
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }
    handleSubmit = (res) =>{
        res.preventDefault()
        console.log(this.state)
        var resLogin = {
          email: this.state.email,
          password: this.state.password

      }
      axios.post("http://127.0.0.1:5000/restuarent/login", resLogin)
          .then((response) => {
            console.log(response.data)

              this.setState({
                res_id:response.data
              })
              if(this.state.res_id == null){
                alert("Wrong Credential")
              }
              else{
                this.props.setResId(this.state.res_id)
                this.props.history.push('/restuarent/home')
              }        
          })
          .catch((err) => alert(err))
    }
  render() {
    const smallStyle = { fontSize: '0.8rem'}
    return (
        <form onSubmit = {this.handleSubmit}>
        <MDBRow>
          <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3 shadow   ">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5"><strong>Sign in</strong></h3>
                </div>
                <MDBInput label="Your email" group type="email" success="right" name = "email"  onChange = {this.handleChange}/>
                <MDBInput label="Your password" group type="password" validate containerClass="mb-0" name = "password"  onChange = {this.handleChange}/>
                <div class="text-center mb-3">
            <button type="submit" class="btn blue-gradient btn-block btn-rounded z-depth-1a">Sign In</button>
          </div>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="grey-text d-flex justify-content-end" style={smallStyle}>New User? <Link to="/restuarent/signup" className="blue-text ml-1"> Sign Up</Link></p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </form>
    );
  }
}

export default RestuarentLogin;