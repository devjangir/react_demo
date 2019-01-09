import React, { Component } from "react";
import './Header.css';
import { BrowserRouter as Router, withRouter, Switch , Redirect} from "react-router-dom";
export default class Header extends Component {
    state = {
        toDashboard: false,
      }
    logout = () => {
        localStorage.removeItem('searchDate');
        localStorage.removeItem('searchCount');
        localStorage.removeItem('starwar_user');
        this.setState({
            toDashboard: true
        })
    };
    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/login' />
        }
        return (
        <div style={headerStyle}>
            <div style={subHeaderStyle}>
                <div style={{display: 'inline-block', width:'90%', color:'white', fontSize:24}}><label>Welcome <span style={{color:'yellow'}}>{localStorage.getItem('starwar_user').replace(/(^\")|("$)/gi, "") }</span></label>
                </div>
                <div style={{display: 'inline-block'}}>
                    <button style={buttonStyle} onClick={this.logout}>Logout</button>
                </div>
                </div>
        </div>
    );
    }
}
const headerStyle = {
    width: '100%',
    height: '60px',
    display: 'flex',
    backgroundColor:'#2980b9',
    alignItems: 'center',
    justifyContent: 'center',
}
const subHeaderStyle = {
    width: '80%',
    height: '100%',
    marginTop: 24,
    marginLeft: 8,
    justifyContent: 'center',
}
const userLabelStyle = {
    width:'100%',
    padding: 10,
    fontSize: 24,
    height: '100%',
    display: 'inline-block',
    display: 'flex',
}   
const buttonStyle = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 18,
    fontWeight: 500,
    borderRadius: 8,
}
