import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from "./pages/Navigation";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

// a class that return a React element
// a Router to render the following paths:
// - / (Home)
// - /about (About)
// - /contact (Contact)
// - /blog/:id (Blog)
// - /blog/:id/edit (BlogEdit)
// - /blog/new (BlogNew)
// - /404 (NotFound)
// - /500 (ServerError)
// - /login (Login)
// - /logout (Logout)
// - /register (Register)

class App extends React.Component {
  render() {
    return (
        <Router >
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog/:id" component={Blog} />
            <Route path="/blog/:id/edit" component={BlogEdit} />
            <Route path="/blog/new" component={BlogNew} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
            <Route component={ServerError} />
          </Switch>
        </Router>
    )
  }
}


export default App;
