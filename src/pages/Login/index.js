import React, { Component } from "react";

import gif from "../../assets/images/stalker.gif";
import { Container, Form, Input, Button } from "reactstrap";

export default class Login extends Component {
  logar = evt => {
    evt.preventDefault();

    const input = evt.target.children[1];

    this.props.history.push(`/home/${input.value}`);
  };

  render() {
    return (
      <Container className="h-100">
        <Form
          className="h-100 d-flex flex-column align-items-center justify-content-center"
          onSubmit={this.logar}
        >
          <img className="w-100 rounded" src={gif} alt="gif stalker" />
          <Input
            className="text-center mt-2"
            placeholder="Seu login do GitHub"
          />
          <Button className="w-100" color="dark">
            Logar
          </Button>
        </Form>
      </Container>
    );
  }
}
