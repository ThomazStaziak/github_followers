import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Navbar,
  InputGroup,
  Input,
  InputGroupAddon,
  Form,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Spinner,
  Container,
  Row,
  Col,
  CardText
} from "reactstrap";

import { MdSearch, MdPeople } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

class Home extends React.Component {
  state = {
    loading: false,
    followers: [],
    user: {}
  };

  componentDidMount = async () => {
    const response = await axios.get(
      `https://api.github.com/users/${this.props.match.params.username}`
    );

    this.setState({ user: response.data });
  };

  loadFollowers = async evt => {
    evt.preventDefault();

    this.setState({
      loading: true
    });

    const form = evt.target;

    const inputGroup = form.children[0];

    const input = inputGroup.children[0];

    const followers = await axios.get(
      `https://api.github.com/users/${input.value}/followers`
    );

    input.value = "";

    this.setState({
      loading: false,
      followers: followers.data
    });
  };

  render() {
    return (
      <>
        <Navbar color="dark">
          <Container className="d-flex justify-content-center">
            <img
              className="border border-white rounded-circle mr-2"
              src={this.state.user.avatar_url}
              alt="Foto de usuário"
              height="50"
              width="50"
            />
            <span className="text-white">
              Logado como
              <Link to="/" className="font-weight-bold text-white ml-1">
                {this.state.user.login}
              </Link>
            </span>
          </Container>
        </Navbar>

        <Navbar color="dark" fixed="bottom">
          <Container className="d-flex justify-content-center">
            <Col xs="12" md="6">
              <Form onSubmit={this.loadFollowers}>
                <InputGroup>
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Button color="danger">
                      {this.state.loading ? (
                        <Spinner color="dark" size="sm" />
                      ) : (
                        <MdSearch size="20" />
                      )}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </Col>
          </Container>
        </Navbar>

        <Container>
          <Row>
            {this.state.followers.map(follower => (
              <Col key={follower.id} xs="12" md="3">
                <Card className="mb-3 text-white" color="dark">
                  <CardImg
                    top
                    width="100%"
                    src={follower.avatar_url}
                    alt={follower.name}
                  />
                  <CardBody>
                    <CardTitle className="text-center">
                      {follower.login}
                    </CardTitle>
                    <CardText className="text-center">
                      <a
                        href={follower.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub size="20%" color="#FFF" />
                      </a>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {this.state.loading && (
          <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <Spinner color="dark" size="lg" />
            Carregando...
          </div>
        )}

        {this.state.followers.length === 0 && (
          <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <MdPeople size="150" color="#343a40" />
            Digite o nome de usuário que deseja stalkear
          </div>
        )}
      </>
    );
  }
}

export default Home;
