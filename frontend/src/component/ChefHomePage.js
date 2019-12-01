import React, { Component } from 'react'
import NavbarChef from './NavbarChef'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ChefHomePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             myproducts:[]
        }
    }
    

    componentDidMount() {
        axios({
            method: 'get',
            url: "http://127.0.0.1:5000/chef/show-dish-chef/"+this.props.passChefId
        })
            .then((response) => {
                this.setState({
                    myproducts: response.data
                });
            })
            .catch((err) => alert(err))
        }
    render() {
        console.log(this.props.passChefId)
        console.log(this.state.myproducts)

        let data = this.state.myproducts.map((a)=> {
            return (
                <div class="col-lg-3 col-md-4 mb-4 float-left  mt-4">

                <div class="card card-cascade narrower mb-4 " style={{"margin-top": "28px"}}>
                <div class="view view-cascade">
                    <img src={a.image} class="card-img-top" alt={a.name} />
                </div>
                
                <div class="card-body card-body-cascade">
                    <h5 class="pink-text"><i class="fas fa-utensils"></i>{a.name}</h5>
                
                    <h4 class="card-title">{a.type}</h4>
                
                    <p class="card-text">{a.desc}</p>
                    <Link to={`/users/allDish/${a.id}`}><button class="btn btn-unique" style={{marginLeft:"112px"}}>Know More</button></Link>
                </div>
                </div>
                </div>

            )
        })
        return (
            <div>
                <NavbarChef chefId={this.props.passChefId}/>
                {data}
                </div>
              
        )
    }
}
export default ChefHomePage