
import React from "react";
import BlogEntry from "../components/BlogEntry";

// a react component that display a blog post using the BlogPost component
// it receives its props from the react router

class Blog extends React.Component {
    // renders the BlogEntry component with the id from the props
    render() {
        return (
            <BlogEntry id={this.props.match.params.id} />
        );
    }
}

export default Blog;