import React from "react"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Signup from "./auth/Signup"
import Login from "./auth/Login"
import Profile from "./auth/Profile"
import PrivateRoute from "./auth/PrivateRoute"
import ForgotPassword from "./auth/ForgotPassword"
import UpdateProfile from "./auth/UpdateProfile"
import Dashboard from "./Dashboard"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Main */}
          <PrivateRoute exact path="/" component={Dashboard} />

          {/* Profile */}
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />

          {/* Auth */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App