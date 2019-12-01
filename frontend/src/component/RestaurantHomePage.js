import React from 'react'
import axios from 'axios'
import NavbarRes from './NavbarRes'
class RestaurantHomePage extends React.Component {
    constructor(props) {
        super(props)  
        this.state = {
            ChefNeedJob:[],
            ChefNeedNotJob:[]
             
        }
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: "http://127.0.0.1:5000/chef/need-job",
        })
            .then((response) => {
                this.setState({
                    ChefNeedJob: response.data,
                });
            })
            .catch((err) => alert(err))
        axios({
            method: 'get',
            url: "http://127.0.0.1:5000/chef/need-not-job",
        })
            .then((response) => {
                this.setState({
                    ChefNeedNotJob: response.data,
                });
            })
            .catch((err) => alert(err))
    }
    
    
    render() {
        console.log(this.props.passResId)
        let need_job = this.state.ChefNeedJob.map(e=>{
            return(
                <div>
                    <div class="card" style={{width:"300px"}}>
                        <img src={e.image} class="card-img-top" alt={e.name}/>
                        <div class="card-body">
                            <h5 class="card-title">{e.name}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            )
        })
        let not_need_job =this.state.ChefNeedNotJob.map(e=>{
            return(
                <div>
                    <div class="card" style={{width:"300px",float:"left",marginLeft:"30px"}} >
                        <img src={e.image} class="card-img-top" alt={e.name}/>
                        <div class="card-body">
                            <h5 class="card-title">{e.name}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <NavbarRes resId={this.props.passResId}/>
                <h2 className="text-center">Looking for Job</h2>
                {need_job}
                <h2 className="text-center">Not Looking for Job</h2>
                {not_need_job}
            </div>
        )
    }
}
export default  RestaurantHomePage
