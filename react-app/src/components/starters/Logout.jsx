import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Logout extends Component{
    constructor(props){
        super(props)
        localStorage.removeItem("token")
    }
    render(){
        return(
            <div align='center'>
                <h1 style={{textAlign:'center',padding:'10px 10px',backgroundColor:'black',color:'white'}}>You have been logged out!!</h1>
                <br/>
                <br/>
                <Link style={{textAlign:'center',fontSize:'20px'}} to="/">Wish to log in again? Click here</Link>
            </div>
        )
    }
}