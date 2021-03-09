import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import ContainerCentered from "./ContainerCentered"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Invalid email or password")
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

  return (
    <ContainerCentered>
      <Card bg="light" border="primary" className="shadow">
        <Card.Body>
          <Card.Header as="h2" className="text-center mb-5">Log in</Card.Header>
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
                <Form.Control type={hidden ? "password" : "text"} ref={passwordRef} required />
              </InputGroup>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-right mt-4 flex-end">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Do not have an account? <Link to="/signup">Sign Up</Link>
      </div>
      <br />
      <br />
      <Copyright />
    </ContainerCentered>
  )
}
