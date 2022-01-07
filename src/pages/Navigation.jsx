
//class component of a navigation bar using react-bootstrap components of the following paths:
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

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Blog</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">Home</a>
            <a className="nav-item nav-link" href="/about">About</a>
            <a className="nav-item nav-link" href="/contact">Contact</a>
            <a className="nav-item nav-link" href="/blog">Blog</a>
            <a className="nav-item nav-link" href="/login">Login</a>
            <a className="nav-item nav-link" href="/logout">Logout</a>
            <a className="nav-item nav-link" href="/register">Register</a>
          </div>
        </div>
      </nav>
    );
  }
}


export default Navigation;