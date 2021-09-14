import React, { Component } from 'react';

class AddComment extends Component {
  state = { content: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  handleSubmit = event => {
    event.preventDefault();
    const { content } = this.state;

    this.props.onCreate({ content });
    
    this.setState({ content: '' });
  };

  render() {
    const { content } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="AddComment">
        <input
          type="text"
          name="content"
          placeholder="Comment"
          value={content}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Comment" />
      </form>
    );
  }
}

export default AddComment;