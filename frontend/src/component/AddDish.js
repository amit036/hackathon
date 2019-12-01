import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import axios from 'axios'
import NavbarUser from './NavbarUser';

class AddDish extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            desc: "",
            image: "",
            process:"",
            types:""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    handleSubmit = (user) => {
        user.preventDefault()
        var addDish = {
            name: this.state.name,
            types:this.state.type,
            desc: this.state.desc,
            process: this.state.process,
            image: this.state.image

        }
        axios.post("http://127.0.0.1:5000/chef/add-dish/" + this.props.passChefId, addDish)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => alert(err))
    }
    render() {
        return (
            <div style={{marginTop:"100px"}}>
            <NavbarUser/>
            <form onSubmit={this.handleSubmit}>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol lg="6" md="6" className="card mt-5">
                            <h3 className="h3 text-center mb-4">Add Dish</h3>
                            <MDBInput label="Dish Name" name="name" success="right" onChange={this.handleChange} />
                            <MDBInput label="Dish Type" name="types"  onChange={this.handleChange} />
                            <MDBInput label="Dish Image Url" type="text" name="image" onChange={this.handleChange} />
                            <MDBInput label="Description" type="textarea" name="desc" onChange={this.handleChange} />
                            <MDBInput label="Process" type="textarea" name="process" onChange={this.handleChange} />
                            <div className="text-center">
                                <MDBBtn type="submit" color="primary">Add Recipe</MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>
            </div>
        )
    }
}

export default AddDish;