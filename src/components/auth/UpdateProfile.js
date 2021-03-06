import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Nav from "./Nav"
import ContainerCentered from "./ContainerCentered"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hiddenTwo, setHiddenTwo] = useState(true);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const toggleShow = () => {
    setHidden(hidden ? false : true)
  }

  const toggleShowTwo = () => {
    setHiddenTwo(hiddenTwo ? false : true)
  }

  return (
    <div>
      <Nav />
      <ContainerCentered>
        <Card bg="light" border="primary" className="shadow-sm">
          <Card.Body>
            <h2 className="text-center mb-4">Edit Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                  disabled
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-2 mr-sm-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ cursor: "pointer" }} onClick={toggleShow}> {hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type={hidden ? "password" : "text"}
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <InputGroup className="mb-2 mr-sm-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ cursor: "pointer" }} onClick={toggleShowTwo}> {hiddenTwo ? <VisibilityIcon /> : <VisibilityOffIcon />}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type={hiddenTwo ? "password" : "text"}
                    ref={passwordConfirmRef}
                    placeholder="Leave blank to keep the same"
                  />
                </InputGroup>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Update
            </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
        </div>
      </ContainerCentered>
    </div>
  )
}
