import React from "react";
import {Link} from "react-router-dom";


//class component of a navigation bar using react-bootstrap components of the following paths:
// - / (Home)
// - /about (About)
// - /contact (Contact)
// - /login (Login) (unimplemented)
// - /logout (Logout) (unimplemented)
// - /register (Register) (unimplemented)

class Navigation extends React.Component {
    //the navigation uses the router Link component to navigate to the desired page
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    <img src="https://www.freelogodesign.org/Content/img/logo-samples/flooop.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                    BissBlog
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
/*
<ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
 */


export default Navigation;