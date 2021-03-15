import React from 'react'
import Nav from './auth/Nav'

export default function Dashboard() {
    return (
        <div>
            <Nav />
            <br />
            <div className="container">
                <div className="title">
                    {/* <h1>Instageram</h1> */}
                    <h2>Instageram</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    )
}
