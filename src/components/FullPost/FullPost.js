import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
 
    state= {
        selectedPostData: null
    }
    
    //take care of infinite loop of rendering by checking that the fetched data is not the same as before
    componentDidUpdate(){
        if(this.props.selectedPostId){
            if (!this.state.selectedPostData || this.props.selectedPostId !== this.state.selectedPostData.id) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.selectedPostId).
                then(response => {
                    console.log(response)
                    this.setState({selectedPostData: response.data})
                })
            }
        }
    }

    render () {

        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.state.selectedPostData){
            post = (
                <div className="FullPost">
                    <h1>{this.state.selectedPostData.title}</h1>
                    <p>{this.state.selectedPostData.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        
        return post;
    }
}

export default FullPost;