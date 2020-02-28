import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Container, Navbar } from "reactstrap";

export default class Header extends Component {
  render() {
    return (
      <Navbar color="dark">
        <Container className="d-flex justify-content-center">
          <img
            className="border border-white rounded-circle mr-2"
            src={this.props.avatar}
            alt="Foto de usuário"
            height="50"
            width="50"
          />
          <span className="text-white">
            Logado como
            <Link to="/" className="font-weight-bold text-white ml-1">
              {this.props.username}
            </Link>
          </span>
        </Container>
      </Navbar>
    );
  }
}
