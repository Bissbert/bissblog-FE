
import React from "react";
import {BlogPreview} from "../components/BlogEntry";

//a react component that renders the home page
//the home page is the landing page for the app
//the home page contains a title at the top that shows the page name
//the home page contains a search bar and a list of all the blogposts previews with infinite scrolling
//when using the search bar, the home page will filter the blogposts based on the search term
//the home page also contains a button to create a new blogpost
//when the user clicks the button, the user will be redirected to the create blogpost page
//when the user clicks on a blogpost, the user will be redirected to the blogpost page and the current page gets added to the history
//the home page also contains a button to logout the user


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      blogposts: [],
      page: 1,
      loading: false,
      hasMore: true,
      error: null
    };
  }

  //when the component mounts, the home page will fetch the blogposts from the database
  //the blogposts will be stored in the state
  componentDidMount() {
    this.fetchBlogposts();
  }

  //fetchBlogposts fetches the blogposts from the database
  //the blogposts will be stored in the state
  fetchBlogposts = () => {
    this.setState({ loading: true });
    fetch(`/blogposts?page=${this.state.page}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            blogposts: this.state.blogposts.concat(result.blogposts),
            loading: false,
            hasMore: result.hasMore
          });
        },
        error => {
          this.setState({
            error,
            loading: false
          });
        }
      );
  };

  //handleSearchTermChange is called when the user types in the search bar
  //the search term will be stored in the state
  handleSearchTermChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  //handleSearchTermSubmit is called when the user presses enter in the search bar
  //the search term will be stored in the state
  //the search term will be used to filter the blogposts
  handleSearchTermSubmit = event => {
    event.preventDefault();
    this.setState({
      searchTerm: event.target.value
    });
  };

  //handleCreateBlogpostClick is called when the user clicks the create blogpost button
  //the user will be redirected to the create blogpost page
  handleCreateBlogpostClick = event => {
    event.preventDefault();
    this.props.history.push("/create");
  };

  //handleBlogpostClick is called when the user clicks on a blogpost
  //the user will be redirected to the blogpost page and the current page gets added to the history
  handleBlogpostClick = (event, blogpost) => {
    event.preventDefault();
    this.props.history.push(`/blogposts/${blogpost._id}`);
  };

  //handleLogoutClick is called when the user clicks the logout button
  //the user will be logged out
  handleLogoutClick = event => {
    event.preventDefault();
    fetch("/logout", {
      method: "POST"
    })
      .then(res => res.json())
      .then(
        result => {
          this.props.history.push("/");
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  //renderBlogposts renders the blogposts
  //the blogposts will be filtered based on the search term
  //the blogposts will be rendered as a list of blogpost previews using the BlogPreview component
  //when the user clicks on a blogpost, the user will be redirected to the blogpost page and the current page gets added to the history
  renderBlogposts = () => {
    const { blogposts, searchTerm } = this.state;
    const filteredBlogposts = blogposts.filter(blogpost => {
      return blogpost.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return filteredBlogposts.map(blogpost => {
      return (
        <BlogPreview
          key={blogpost._id}
          blogpost={blogpost}
          onClick={event => this.handleBlogpostClick(event, blogpost)}
        />
      );
    });
  };

  //the page contains a title at the top that shows the page name
  //the page also contains a button to create a new blogpost
  //when the user clicks the button, the user will be redirected to the create blogpost page
  render() {
    const { searchTerm, loading, hasMore, error } = this.state;
    return (
      <div className="home">
        <div className="home-header">
          <h1>Home</h1>
          <button onClick={this.handleLogoutClick}>Logout</button>
        </div>
        <div className="home-search">
          <form onSubmit={this.handleSearchTermSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={this.handleSearchTermChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="home-blogposts">
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {this.renderBlogposts()}
        </div>
        {hasMore && (
          <button onClick={this.fetchBlogposts}>Load More</button>
        )}
        <button onClick={this.handleCreateBlogpostClick}>Create Blogpost</button>
      </div>
    );
  }

}

export default Home;