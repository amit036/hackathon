import React from 'react'
import axios from 'axios';
import '../component/DishesDetails.css';
import NavbarUser from './NavbarUser';
import { Link} from 'react-router-dom'

class DishDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDish: [],
            rating: "",
            user_id:"",
            cid:"",
            show_rating:"",
            comment:"",
            all_comments:[]
            

        }
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: "http://127.0.0.1:5000/chef/show-dish/" + this.props.match.params.id
        })
            .then((response) => {
                this.setState({
                    selectedDish: response.data,
                    cid:response.data.cid
                });
                axios({
                    method: 'get',
                    url: "http://127.0.0.1:5000/user/rating/"+response.data.cid
                })
                    .then((response) => {
                        this.setState({
                            show_rating: response.data,
                        });
                    })

                axios({
                    method: 'get',
                    url: "http://127.0.0.1:5000/user/comments/"+response.data.cid
                })
                    .then((response) => {
                        this.setState({
                            all_comments: response.data,
                        });
                    })
            })
            
            
            

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var ratingDetails = {
            user_id: this.props.passUserId,
            rating: this.state.rating
        }
        axios.post("http://127.0.0.1:5000/user/rating/"+this.state.cid, ratingDetails)
        .then((response) => {
        console.log(response.data)
        alert('Thanks for Rating')
        this.props.history.push('/users/home')
                 
      })
      .catch((err) => alert(err))
    }
    handleChangeComment = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmitComment =(e) =>{
        e.preventDefault()
        var commentDetails = {
            user_id: this.props.passUserId,
            comment: this.state.comment
        }
        axios.post("http://127.0.0.1:5000/user/comments/"+this.state.cid, commentDetails)
        .then((response) => {
        console.log(response.data)
        alert('Comment Successful')
                 
      })
      .catch((err) => alert(err))

    }


    render() {
        let data = this.state.selectedDish
        let show_comments = this.state.all_comments.map(e=>{
            return(
                <div className="card w-75 mb-2">
                    <p>User Id: {e.user_id}</p>
                    <p> Comment: {e.comment}</p>        
                </div>
            )
        })

        return (
            <>
                <NavbarUser username={this.props.passUserId} />
                <div>

                    <div>
                        <div class=" col-md-8 mb-4 mt-5 offset-2 shadow">
                            <div class="card light-blue darken-1 z-depth-2">
                                <div class="card-body">
                                    <h5 className="float-right text-white">Total Rating: {this.state.show_rating}☆</h5>
                                    <h3 class="text-uppercase font-weight-bold light-green-text mt-2 mb-3"><strong>{data.name} </strong></h3>
                                    <h3 class="white-text mb-0">{data.desc}. </h3>
                                    <h3 className="light-green-text font-weight-bold"> Recipe Making Process</h3>
                                    <h4 class="white-text mb-0">{data.process}</h4>
                                    <div class="container text-center">Give a Rating
                            <div class="starrating risingstar d-flex justify-content-center flex-row-reverse" >
                                            <input type="radio" id="star5" name="rating" value="5" onChange={this.handleChange} />
                                            <label for="star5" title="5 star"></label>
                                            <input type="radio" id="star4" name="rating" value="4" onChange={this.handleChange} />
                                            <label for="star4" title="4 star"></label>
                                            <input type="radio" id="star3" name="rating" value="3" onChange={this.handleChange} />
                                            <label for="star3" title="3 star"></label>
                                            <input type="radio" id="star2" name="rating" value="2" onChange={this.handleChange} />
                                            <label for="star2" title="2 star"></label>
                                            <input type="radio" id="star1" name="rating" value="1" onChange={this.handleChange} />
                                            <label for="star1" title="1 star"></label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-success w-50 align-center" style={{ marginLeft: "300px" }} onClick={this.handleSubmit} >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                  <Link to = "/chat"> <img className="float-right mr-5 mt-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGJ4JYLRGzyStgsOa4s6UulPIk9Vd7vYqQhvpS6GOCu8-P06RF&s" style={{width:"70px",height:"70px"}}></img></Link>
                </div>
                <div class="form-group w-50 offset-3">
                    <h2 className="mt-5 font-weight-bold">Comment here</h2>
                    <textarea name="comment" class="form-control rounded-0" id="exampleFormControlTextarea2" rows="4" onChange={this.handleChangeComment}></textarea>
                    <button type="submit" class="btn btn-danger w-25 align-center float-right mb-5" onClick={this.handleSubmitComment} >Comment</button>
                </div>
                <div className="offset-3">
                <h2 className="mt-5 font-weight-bold">All Comments</h2>
                {show_comments}
                </div>
             
            </>
        )
    }
}
export default DishDetails
