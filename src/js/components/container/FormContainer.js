import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }


  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
      <h1>{seo_title}</h1>
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={event => this.handleChange(event)}
        />
      </form>
    );
  }
}
export default FormContainer;
