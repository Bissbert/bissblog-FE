import React from "react";
import MDEditor from '@uiw/react-md-editor';

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
        super(props);
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
                        <img src={this.state.image} alt="blog image" className="img-fluid"/>
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

//the BlogEntry component is exported
export default BlogEntry;

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
            title: props.blogpost.title || "",
            author: props.blogpost.author || "",
            date: props.blogpost.date || "",
            tags: props.blogpost.tags || [],
            image: props.blogpost.image || "",
        }
    }

    //the component is mounted
    //the fetchBlogData function is called
    //the fetchBlogData function is used to fetch the blog data from the server
    componentDidMount() {
        //check if the blog entry is already in the state
        //if not fetch the blog entry from the server
        if (this.state.title === "") {
            this.fetchBlogData();
        }
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
                        <img src={this.state.image} alt={"preview image of the blog"}/>
                    </div>
                </div>
            </div>
        )
    }

}

/**
 * the BlogEntryEdit component is used to edit a blog entry
 * It has the possibility to edit the title, author, tags, preview image and the content
 * The title is in a h1 tag with contentEditable set to true
 * The author and tags are in a table where each of them is a row with a label and a text input
 * The preview image is in a div with a file input
 * The content is in a markdown editor
 * There is a field to upload an image which then can be used in the content md
 * After the upload of the image its id from the server is shown in a list below the upload field
 * In the preview list next to the id there is a button to delete the image. This triggers a delete request to the server
 * The save button is in a button with the classes btn-primary and the text "Save"
 * The cancel button is in a button with the classes btn-secondary and the text "Cancel"
 * The save button is used to save the blog entry
 * The cancel button is used to cancel the edit and returns to the last page from the history
 * The delete button is used to delete the blog entry
 * The delete button is in a button with the classes btn-danger and the text "Delete"
 * When the delete button is pressed the user is asked if he really wants to delete the blog entry before the delete request is sent to the server
 */
export class BlogEntryEdit extends React.Component {

    //the constructor is used to initialize the state
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            tags: [],
            previewImage: "",
            content: "",
            images: [],
        }
    }

    //the fetchBlogData function is used to fetch the blog entry from the server
    //the fetch is done by a get request to the server
    //the response is parsed to json
    //the state is updated with the data
    fetchBlogData() {
        fetch(`/blogpost/${this.props.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    author: data.author,
                    tags: data.tags,
                    previewImage: data.image,
                    content: data.content,
                    images: data.images,
                })
            })
    }

    //the componentDidMount function is used to fetch the blog entry from the server
    //the fetch is done by a get request to the server
    //the response is parsed to json
    //the state is updated with the data
    componentDidMount() {
        this.fetchBlogData();
    }

    //the render function is used to render the component
    //the title is in a h1 tag with contentEditable set to true
    //the author and tags are in a table where each of them is a row with a label and a text input
    //the preview image is in a div with a file input
    //the content is in a markdown editor
    //there is a field to upload an image which then can be used in the content md
    //after the upload of the image its id from the server is shown in a list below the upload field
    //in the preview list next to the id there is a button to delete the image. This triggers a delete request to the server
    //the save button is in a button with the classes btn-primary and the text "Save"
    //the cancel button is in a button with the classes btn-secondary and the text "Cancel"
    //the save button is used to save the blog entry
    //the cancel button is used to cancel the edit and returns to the last page from the history
    //the delete button is used to delete the blog entry
    //the delete button is in a button with the classes btn-danger and the text "Delete"
    //when the delete button is pressed the user is asked if he really wants to delete the blog entry before the delete request is sent to the server
    render() {
        return (
            <div>
                <h1 contentEditable="true" onInput={(e) => this.setState({title: e.target.innerText})}>{this.state.title}</h1>
                <table>
                    <tbody>
                    <tr>
                        <td>Author:</td>
                        <td><input type="text" value={this.state.author} onInput={(e) => this.setState({author: e.target.value})}/></td>
                    </tr>
                    <tr>
                        <td>Tags:</td>
                        <td>
                            <table>
                                <tbody>
                                {this.state.tags.map((tag, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><input type="text" value={tag} onInput={(e) => this.setState({tags: this.state.tags.map((tag, index) => index === index ? e.target.value : tag)})}/></td>
                                            <td><button className="btn btn-danger" onClick={() => this.setState({tags: this.state.tags.filter((tag, index) => index !== index)})}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <button className="btn btn-primary" onClick={() => this.setState({tags: this.state.tags.concat([''])})}>Add Tag</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <input type="file" onChange={(e) => this.setState({previewImage: e.target.files[0]})}/>
                    <ul>
                        {this.state.images.map((image, index) => {
                            return (
                                <li key={index}>
                                    <img src={`/images/${image}`}/>
                                    <button className="btn btn-danger" onClick={() => this.setState({images: this.state.images.filter((image, index) => index !== index)})}>Delete</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <MDEditor value={this.state.content} onChange={(content) => this.setState({content: content})}/>
                <button className="btn btn-primary" onClick={() => this.save()}>Save</button>
                <button className="btn btn-secondary" onClick={() => this.props.history.goBack()}>Cancel</button>
                <button className="btn btn-danger" onClick={() => this.delete()}>Delete</button>
            </div>
        )
    }
}