import React, { Component } from 'react';
import { firestore } from '../firebase';
import { auth } from '../firebase';

import Posts from './Posts';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    posts: [],
    user: null
  };

  unsubscribeFromPosts = null;
  unsubscribeFromUser = null;

  componentDidMount = () => {
    this.unsubscribeFromPosts = firestore.collection('posts').onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      this.setState({ posts });
    })

    this.unsubscribeFromUser = auth.onAuthStateChanged(user => {
      this.setState({ user });
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromPosts();
    this.unsubscribeFromUser();
  }

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;