import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';

import { userRegister } from "../../redux/authentication";

const Admin = ({ registrationResult, userRegister }) => {
  const [result, setResult] = useState(registrationResult.error);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    if (name.length === 0) {
      setResult("Name is required")
    } else if (email.length === 0) {
      setResult("Email is required")
    } else if (password !== confirmPassword) {
      setResult("Passwords do not match")
    } else if (password.length < 6) {
      setResult("Password must contain at-least 6 digits")
    } else {
      let body = { name, email, password }
      userRegister(body)
    }
  }

  useEffect(() => {
    if (registrationResult.error) {
      setResult(registrationResult.error)
    }
  }, [])
  return (
    <div>
      <Card className='shadow' style={{ width: '35vw' }}>
        <Card.Body>

          <Card.Img style={{ height: "50%", width: "50%" }} variant="top" src="https://acegif.com/wp-content/uploads/2021/4fh5wi/welcome-18.gif" />
          <Card.Img style={{ height: "50%", width: "50%" }} variant="top" src="//st3.depositphotos.com/1763191/35375/v/450/depositphotos_353753504-stock-illustration-boy-gray-shirt-laying-floor.jpg" />
          <hr />
          <Card.Title>Welcome!</Card.Title>

          <InputGroup className="mb-3">
            <InputGroup.Text>Name</InputGroup.Text>
            <FormControl
              value={name}
              placeholder="Name"
              onChange={(value) => setName(value.target.value)}
            />
          </InputGroup>

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


          <InputGroup className="mb-3">
            <InputGroup.Text>Confirm Password</InputGroup.Text>
            <FormControl
              value={confirmPassword}
              placeholder="password"
              type='password'
              onChange={(value) => setConfirmPassword(value.target.value)}
            />
          </InputGroup>

          <p className={result ? 'error' : ''}>{result}</p>

          <div className="d-grid gap-2">
            <Button
              onClick={() => register()}
              variant="primary"
              disabled={!(name && email)}
              size="lg">
              Register
            </Button>
            <hr />
          </div>

          <label>Already have an Account?&nbsp;</label>
          <Link className="simple-url" to={"/"} >
            <span>
              Sign In
            </span>
          </Link>
          <hr />


        </Card.Body>
      </Card >
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    registrationResult: state.authentication,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userRegister: (body) => dispatch(userRegister(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
