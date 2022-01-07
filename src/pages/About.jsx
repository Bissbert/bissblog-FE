
import React from "react";

// This is the about page that contains information about the project and its contributors/creators.
// This project is by a student to practice their skills in React and Spring Boot.
// the idea behind the project was to create a general purpose blog application that can be made to fit multiple purposes.
// This version of the blog is to help other students learn how to program.
// The topics of the blog are:
// 1. how to use React
// 2. how to use Spring Boot
// 3. how to work with databases
// 4. how to get through the ICT swizerland module toolbox that is used during IT apprenticeships
// this about page is a react component
// for the display of the data on the page, I used the react-bootstrap library

class About extends React.Component {
    // the render method uses the bootstrap library to style the page
    // the topics are displayed in a table
    // the topics are:
    // 1. how to use React
    // 2. how to use Spring Boot
    // 3. how to work with databases
    // 4. how to get through the ICT swizerland module toolbox that is used during IT apprenticeships
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>About</h1>
                        <p>This project is by a student to practice their skills in React and Spring Boot.</p>
                        <p>The idea behind the project was to create a general purpose blog application that can be</p>
                        <p> made to fit multiple purposes.</p>
                        <p>This version of the blog is to help other students learn how to program.</p>
                        <p>The topics of the blog are:</p>
                        <br/>
                        <br/>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>How to use React</td>
                            </tr>
                            <tr>
                                <td>How to use Spring Boot</td>
                            </tr>
                            <tr>
                                <td>How to work with databases</td>
                            </tr>
                            <tr>
                                <td>How to get through the ICT swizerland module toolbox that is
                                    used during IT
                                    apprenticeships
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default About;