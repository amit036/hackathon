import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserLogin from './pages/users/UserLogin';
import UserSignup from './pages/users/UserSignup';
import RestuarentLogin from './pages/restuarents/RestuarentLogin';
import RestuarentSignup from './pages/restuarents/RestuarentSignup';
import ChefLogin from './pages/chefs/ChefLogin';
import ChefSignup from './pages/chefs/ChefSignup';
import AddDish from './component/AddDish';
import UserHomePage from './component/UserHomePage';
import RestaurantHomePage from './component/RestaurantHomePage'
import ChefHomePage from './component/ChefHomePage';
import LogoutUser from './component/LogoutUser';
import DishDetails from './component/DishDetails';
import LandingPage from './component/LandingPage';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: "",
      chef_id:"",
      res_id:""    
    }
  }
  userIdDetails = (getUserId) =>{
    this.setState({
      user_id:getUserId
    })
  }
  chefIdDetails = (getChefId) =>{
    this.setState({
      chef_id:getChefId
    })
  }

  resIdDetails = (getResId) =>{
    this.setState({
      chef_id:getResId
    })
  }
  removeUserId = () =>{
    this.setState({
      user_id: ''
    })
  }
  removeChefId = () =>{
    this.setState({
      chef_id: ''
    })
  }
  removeResId = () =>{
    this.setState({
      res_id: ''
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact render={(props)=>{return<LandingPage {...props} />}}/>
          <Route path="/users/login" exact render={(props) => { return <UserLogin setUserId={(getUserId)=>{this.userIdDetails(getUserId)}} {...props} /> }} />
          <Route path="/users/signup" exact render={(props) => { return <UserSignup {...props} /> }} />
          <Route path="/users/home" exact render={(props) => { return <UserHomePage passUserId ={this.state.user_id} {...props} /> }} />
          <Route path="/restuarent/login" exact render={(props) => { return <RestuarentLogin setResId ={(getResId)=>{this.resIdDetails(getResId)}} {...props} /> }} />
          <Route path="/restuarent/home" exact render={(props) => { return <RestaurantHomePage passResId ={this.state.res_id} {...props} /> }} />
          <Route path="/restuarent/signup" exact render={(props) => { return <RestuarentSignup {...props} /> }} />
          <Route path="/chef/login" exact render={(props) => { return <ChefLogin setChefId={(getChefId)=>{this.chefIdDetails(getChefId)}} {...props} /> }} />
          <Route path="/chef/home" exact render={(props) => { return <ChefHomePage passChefId = {this.state.chef_id} {...props} /> }} />
          <Route path="/chef/signup" exact render={(props) => { return <ChefSignup {...props} /> }} />
          <Route path="/chef/addDish" exact render={(props) => { return <AddDish passChefId = {this.state.chef_id} {...props} /> }} />
          <Route path="/users/alldish/:id" exact render={(props) => { return <DishDetails passUserId = {this.state.user_id} {...props} /> }} />
          <Route path="/users/logout" exact render={(props) => { return <LogoutUser logoutUser={() => this.removeUserId()} passUserId={this.state.user_id} {...props} /> }} />
          <Route path="/chef/logout" exact render={(props) => { return <LogoutUser logoutChef={() => this.removeChefId()} passChefId={this.state.chef_id} {...props} /> }} />
          <Route path="/restuarent/logout" exact render={(props) => { return <LogoutUser logoutRes={() => this.removeResId()} passResId={this.state.res_id} {...props} /> }} />
        </Router>
      </div>
    )
  }
}

export default App;
