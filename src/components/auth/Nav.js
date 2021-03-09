import React from 'react'
import { Badge } from 'react-bootstrap'
import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-brand" >Adhi Kurniawan</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link className="nav-link active" to="/">Home <span className="sr-only"></span></Link>
                        <Link className="nav-link active" to="/profile">Profile <Badge variant="light">9</Badge> <span className="sr-only"></span></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
