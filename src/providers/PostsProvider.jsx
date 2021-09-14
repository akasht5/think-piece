import React,{ createContext,Component } from 'react';
import { firestore } from '../firebase';

export const PostsContext = createContext();

class PostsProvider extends Component{
    state = {
        posts : []
    }

    unsubscribeFromPost = null;

    componentDidMount(){
        this.unsubscribeFromPost = firestore.collection('posts').onSnapshot((snapshot) => {
            const posts = snapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })
      
            this.setState({ posts });
        })
    }

    componentWillUnmount(){
        this.unsubscribeFromPost()
    }

    render(){
        const { posts } = this.state;
        const { children } = this.props;

        return(
            <PostsContext.Provider value={posts}>
                { children }
            </PostsContext.Provider>
        )
    }
}

export default PostsProvider