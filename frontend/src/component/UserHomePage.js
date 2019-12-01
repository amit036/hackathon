import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import NavbarUser from './NavbarUser';
class UserHomePage extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            allUser:[]
             
        }
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: "http://127.0.0.1:5000/chef/list-dish",
        })
            .then((response) => {
                this.setState({
                    allUser: response.data,
                });
            })
            .catch((err) => alert(err))
            
    }
    
    render() {
        console.log(this.props.passUserId)
        console.log(this.state.allUser)
        let data = this.state.allUser.map((a)=> {
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
                <NavbarUser username={this.props.passUserId}/>
                <div style={{marginTop:"100px"}}>
                {data}
                </div>

            </div>
        )
    }
}
export default UserHomePage