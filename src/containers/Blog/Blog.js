import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    
    state = {
        posts: [],
        selectedPost: null
    }
    
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts').
         then(response => {
            const posts = response.data.slice(0,6);
            const posts_w_author = posts.map(post => {
                return {...post, author: "Neelima"}
            })
            this.setState({posts: posts_w_author })
            console.log(response)
        })
    }

    selectedPostHandler(id){
        this.setState({selectedPost: id})
    }

    render () {
        const posts = this.state.posts.map(post => {
            return (<Post title={post.title} author={post.author} click={() => this.selectedPostHandler(post.id)}/>)
        })

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPost={this.state.selectedPost}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;