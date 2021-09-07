import React, { Component } from 'react';

import { firestore } from '../firebase';

import Posts from './Posts';

class Application extends Component {
  state = {
    posts: []
  };

  componentDidMount = async () => {
    const snapshot = await firestore.collection('posts').get();
    
    const posts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    this.setState({ posts });
  }

  handleCreate = async post => {
    const { posts } = this.state;

    const docRef = await firestore.collection('posts').add(post);

    const doc = await docRef.get();

    const newPost = {
      id: doc.id,
      ...doc.data()
    }

    this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async id => {
    const { posts } = this.state;

    await firestore.doc(`posts/${id}`).delete();

    const newPosts = posts.filter(post => post.id !== id);

    this.setState({ posts: newPosts });
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;