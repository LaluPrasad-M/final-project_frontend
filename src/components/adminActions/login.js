import React, { useState } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../redux/authentication";
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';

const Users = ({ userLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card className='shadow' style={{ width: '35vw' }}>
      <Card.Body>
        <Card.Img style={{ height: "50%", width: "50%" }} variant="top" src="https://acegif.com/wp-content/uploads/2021/4fh5wi/welcome-18.gif" />
        <Card.Img style={{ height: "50%", width: "50%" }} variant="top" src="//st3.depositphotos.com/1763191/35375/v/450/depositphotos_353753504-stock-illustration-boy-gray-shirt-laying-floor.jpg" />
        <hr />
        <Card.Title>Welcome Back!</Card.Title>

        <InputGroup className="mb-3">
          <InputGroup.Text>E-mail</InputGroup.Text>
          <FormControl
            value={email}
            placeholder="myemail@example.com"
            onChange={(value) => setEmail(value.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Password</InputGroup.Text>
          <FormControl
            value={password}
            placeholder="password"
            type='password'
            onChange={(value) => setPassword(value.target.value)}
          />
        </InputGroup>
        <div className="d-grid gap-2">
          <Button
            onClick={() => userLogin(email, password, 'user')}
            variant="primary"
            disabled={!(email && password.length >= 6)}
            size="lg">
            Login
          </Button>
        </div>
        <hr />
      </Card.Body>
    </Card>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (email, password) => dispatch(userLogin(email, password, "admin")),
  };
};

export default connect(null, mapDispatchToProps)(Users);
