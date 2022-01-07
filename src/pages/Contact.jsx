import React from "react";

// a contact component that displays the contact information and a form to open a mail client with the contact information
// The styling is done using bootstrap
// the contact information is taken from the contact.json file and stored in the state

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contact: null
        }
    }

    //this function gathers name and message from the form and returns them escaped in form of a mailto link
    generateMailToFromForm() {
        let name = document.getElementById("name").value;
        let message = document.getElementById("message").value;
        return "mailto:" + this.state.contact.email + "?subject=" + encodeURIComponent(name) + "&body=" + encodeURIComponent(message);
    }

    // the componentDidMount function is called when the component is mounted
    // the contact.json file is loaded and the state is updated
    componentDidMount(){
        fetch("/contact.json")
        .then(res => res.json())
        .then(data => {
            this.setState({
                contact: data
            })
        })
    }

    render(){
        // if the state is not null, the contact information is displayed
        if(this.state.contact){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>Contact</h1>
                            <p>{this.state.contact.address}</p>
                            <p>{this.state.contact.phone}</p>
                            <p>{this.state.contact.email}</p>
                        </div>
                        <div className="col-md-6">
                            <h1>Send us a message</h1>
                            <form action={this.generateMailToFromForm()}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea className="form-control" id="message" rows="3"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        // if the state is null, the loading message is displayed
        else{
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Loading...</h1>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Contact;