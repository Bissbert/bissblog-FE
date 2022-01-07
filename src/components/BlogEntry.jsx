
import React from "react";
var Markdown = require('react-markdown')

//a react component class for a blog entry
//this component takes a blog id(number) as a prop and uses it to fetch the blog data from the server( blogposts/:id )
//from the server the following data is fetched:
//title, author, date, content, tags, image
//This data is then used to render the blog entry
//first the title is displayed on the top of the page
//then in a table the author, date, tags and are displayed
//last the content, which is a markdown formatted text, is displayed
//the content is rendered using the markdown-it library
//the markdown-it library is used to render the markdown formatted text

class BlogEntry extends React.Component {
    constructor(props) {
        super (props);
        //the state of the component is initialized with the following values
        this.state = {
            title: "",
            author: "",
            date: "",
            content: "",
            tags: [],
            image: "",
        }
    }

    //function to fetch the blog data from the server
    //the data is then used to update the state of the component
    //the state is then used to render the blog entry
    fetchBlogData() {
        fetch("/blogposts/" + this.props.id)
        .then(response => response.json())
        .then(data => {
            this.setState({
                title: data.title,
                author: data.author,
                date: data.date,
                content: data.content,
                tags: data.tags,
                image: data.image,
            })
        })
    }

    //function to render the blog entry
    //the blog entry is rendered using the following components:
    //a title, an author, a date, a tags list, an image and a markdown formatted content
    //first the title is displayed on the top of the page
    //then in a table the author, date, tags and are displayed with the names left of them
    //last the content, which is a markdown formatted text, is displayed
    //the render uses bootstrap to render the components
    //the markdown formatted content is rendered the Markdown component
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{this.state.title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Author:</td>
                                    <td>{this.state.author}</td>
                                </tr>
                                <tr>
                                    <td>Date:</td>
                                    <td>{this.state.date}</td>
                                </tr>
                                <tr>
                                    <td>Tags:</td>
                                    <td>
                                        <ul>
                                            {this.state.tags.map(tag => (
                                                <li key={tag}>{tag}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <img src={this.state.image} alt="blog image" className="img-fluid" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Markdown>
                            {
                                this.state.content
                            }
                        </Markdown>
                    </div>
                </div>
            </div>
        )
    }

    //the component is mounted
    //the fetchBlogData function is called
    //the fetchBlogData function is used to fetch the blog data from the server
    componentDidMount() {
        this.fetchBlogData();
    }
}

//A component to render a preview of the blog entry
//the blog entry is rendered using the following components:
//a title, an author, a date, a tags list and an image
//first the title is displayed on the top of the component
//then in a table the author, date, tags and are displayed next to each other with the names left of them
//last the image is displayed
//the render uses bootstrap to render the components
//the image is rendered using the Image component¨
//the data is fetched from the server using the fetchBlogData function when the component is mounted
export class BlogPreview extends React.Component {
    //the state is used to render the blog entry
    //the state is then used to render the blog entry
    fetchBlogData() {
        fetch("/blogposts/" + this.props.id)
        .then(response => response.json())
        .then(data => {
            this.setState({
                title: data.title,
                author: data.author,
                date: data.date,
                tags: data.tags,
                image: data.image,

            })
        })
    }

    //the state is initialized
    //the fetchBlogData function is called
    //the fetchBlogData function is used to fetch the blog data from the server
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            date: "",
            tags: [],
            image: "",
        }
    }

    //the component is mounted
    //the fetchBlogData function is called
    //the fetchBlogData function is used to fetch the blog data from the server
    componentDidMount() {
        this.fetchBlogData();
    }

    //the render function is used to render the blog entry
    //the render function uses bootstrap to render the components
    //the title is rendered using the Title component
    //the author, date, tags and image are rendered using the table components
    //the image is rendered using the html img tag
    render() {
        return (
            <div className="col-md-4">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h1>{this.state.title}</h1>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Author:</td>
                                    <td>{this.state.author}</td>
                                </tr>
                                <tr>
                                    <td>Date:</td>
                                    <td>{this.state.date}</td>
                                </tr>
                                <tr>
                                    <td>Tags:</td>
                                    <td>
                                        <ul>
                                            {this.state.tags.map(tag => (
                                                <li key={tag}>{tag}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <img src={this.state.image}  alt={"preview image of the blog"}/>
                    </div>
                </div>
            </div>
        )
    }

}

//the BlogEntry component is exported
export default BlogEntry;