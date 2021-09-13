import React, { Component } from 'react';
import { firestore } from '../firebase'
import { withUser } from './withUser'

class AddPost extends Component {
  state = { title: '', content: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onCreate = (post) => {
    firestore.collection('posts').add(post);
  }

  handleSubmit = event => {
    event.preventDefault();

    const { title, content } = this.state;
    const { user } = this.props;
    
    const { uid, displayName, email, photoURL } = user || {}

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date(),
    }
    
    this.onCreate(post);

    this.setState({ title: '', content: '' });
  };

  render() {
    const { title, content } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="AddPost">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Body"
          value={content}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Post" />
      </form>
    );
  }
}

export default withUser(AddPost);