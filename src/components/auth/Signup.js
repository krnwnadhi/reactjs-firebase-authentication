import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import ContainerCentered from "./ContainerCentered"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hiddenTwo, setHiddenTwo] = useState(true);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/profile")
    } catch {
      setError("User already exist")
    }

    setLoading(false)
  }


  function Copyright() {
    return (
      <div align="center">
        {'Copyright © '}
        {/* <Link to="#">
          Your Website
        </Link>{' '} */}
        {new Date().getFullYear()}
        {'.'}
      </div>
    );
  }

  const toggleShow = () => {
    setHidden(hidden ? false : true)
  }

  const toggleShowTwo = () => {
    setHiddenTwo(hiddenTwo ? false : true)
  }

  return (
    <ContainerCentered>
      <Card bg="light" border="primary" className="shadow" >
        <Card.Body>
          <Card.Header as="h2" className="text-center mb-3">Sign up</Card.Header>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="mail@example.com" />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-2 mr-sm-2">
                <InputGroup.Prepend>
                  <InputGroup.Text style={{ cursor: "pointer" }} onClick={toggleShow}> {hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type={hidden ? "password" : "text"} ref={passwordRef} required minLength={8} maxLength={12} placeholder="8-12 characters" />
              </InputGroup>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Your Password</Form.Label>
              <InputGroup className="mb-2 mr-sm-2">
                <InputGroup.Prepend>
                  <InputGroup.Text style={{ cursor: "pointer" }} onClick={toggleShowTwo}> {hiddenTwo ? <VisibilityIcon /> : <VisibilityOffIcon />}</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type={hiddenTwo ? "password" : "text"} ref={passwordConfirmRef} required minLength={6} />
              </InputGroup>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      <br />
      <Copyright />
    </ContainerCentered>
  )
}
