import React from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function Nav() {

    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {

        try {
            await logout()
            history.push("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand" >Adhi Kurniawan</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {currentUser.email}
                            </div>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><Link to="/edit-profile" className="dropdown-item" >Edit Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link to="/" className="dropdown-item" onClick={handleLogout}>Log Out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
