import React, { Component } from "react";
import Form from "react-jsonschema-form";
import { BrowserRouter as Router, withRouter, Switch , Redirect} from "react-router-dom";
import Loader from 'react-loader-spinner'
const schema = {
  type: "object",
  required: ["username","password"],
  properties: {
    username: {type: "string", title: "Username"},
    password: {type: "string", title: "Password"}
  }
};
const uiSchema = {
    username: {
        "ui:widget": "text"
    },
    password: {
          "ui:widget": "password"
    }
  }
const log = (type) => console.log.bind(console, type);
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username : "",
            password : ""
        }
    }
    onSubmit = ({formData}) => {
        console.log("Data submitted: ",  formData);
        this.setState({
            username : formData.username,
            password : formData.password,
            isLoggedIn: false,
            isLoading: false
        })
        this.login()
    }
    isValidUser = () => {

    }
    login = () => {
        this.setState({
            isLoading: true
        })
        fetch("https://swapi.co/api/people/?search=" + this.state.username)
        .then(response => response.json())
        .then(data => {
                if (data.results.length > 0) {
                    const username = data.results[0].name.toLowerCase()
                    const password = data.results[0].birth_year.toLowerCase()
                    console.log("user "+username+": password :"+password)
                    if ((username == this.state.username) && (password == this.state.password)) {
                        console.log("user found");
                        localStorage.setItem('starwar_user', JSON.stringify(username));
                        this.setState({
                            isLoggedIn: true,
                            isLoading: false
                        })
                    } else {
                        console.log("user not found")
                        alert("user not found")
                    }
                } else {
                    alert("user not found")
                }
            })
        .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {
        const loading = this.state.isLoading
        const loader = 'block'
        if (this.state.isLoggedIn === true) {
            return <Redirect to='/' />
        }
        return (
            <div style={containerStyle}>
                <div style={{display: `${loading?'block':'none'}` }}>
                <Loader 
                   type="Oval"
                   color="#00BFFF"
                   height="100"	
                   width="100"
                />
                </div>   
                <div style={headerStyle}>
                    <label>StarWar Demo</label>
                </div>
                <div style={loginContainerStyle}>
                    <div>
                        <Form schema={schema}
                                uiSchema={uiSchema}
                            onChange={log("changed")}
                            onSubmit={this.onSubmit}
                            onError={log("errors")} />
                    </div>
                </div>
            </div>
        )
        
    }
}
export default withRouter(Login);
const loginContainerStyle = {
    width: '30%',
    borderWidth: 10,
    borderColor: 'red',
    borderRadius: 8,
    padding: 10,
    backgroundColor:'#ecf0f1'
}
const containerStyle = {
    backgroundColor:'#3498db',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
}
const headerStyle = {
    fontWeight: 'bold',
    fontSize: 36,
    padding: 20,
    marginBottom: 20,
}
