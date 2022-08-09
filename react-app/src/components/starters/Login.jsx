import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';

export default class Login extends Component{
   constructor(props){
       super(props)
       const token=localStorage.getItem("token")

       let loggedIn = true
       if(token == null){
           loggedIn = false
       }
       let isAdmin = false   //
       let noUser=false
       this.state={
           username:'',
           password:'',
           loggedIn,
           isAdmin,      //
           noUser
       }
       this.onChange=this.onChange.bind(this)
       this.submitForm=this.submitForm.bind(this)
   }

   onChange(e){
       this.setState({
           [e.target.name]: e.target.value
       })
   }

   submitForm(e){
       e.preventDefault()
       const {username,password}=this.state
       //login logic
       if(username==="Admin" && password==="admin@123"){
           localStorage.setItem("token","yxuygwdbdagaugdawd")
           this.setState({
               loggedIn:true,
               isAdmin:true
           })
       }
       
    else{
        this.setState({noUser:true})
    }
   }

    render(){
        if(this.state.loggedIn===true && this.state.isAdmin===true){
            return <Navigate to="/securities"/>
        }
        
        
        if(this.state.noUser)
        {
            return(
                <div>
                    <br></br>
                    <div style={{textAlign:'center',color:'red',fontSize:'16px'}}>Wrong credentials</div>
                    <div style={{position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-45%, -60%)',padding:'40px 90px',backgroundColor:'#003F5C',borderRadius:'10px'}}>
                    <h1 style={{textAlign:'center',color:'white'}}>LOG IN</h1>
                    <form onSubmit={this.submitForm}>
                        <h1 style={{fontSize:'16px',color:'white'}}>Username</h1>
                        <input style={{display:'block',width:'100%',padding:'10px 15px',borderRadius:'8px'}} type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange} required/>
                        <br/>
                        <br/>
                        <h2 style={{fontSize:'16px',color:'white'}}>Password</h2>
                        <div>
                            <input style={{display:'block',width:'100%',padding:'10px 15px',borderRadius:'8px'}} 
                            type="password" 
                            placeholder="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.onChange} required/>
                          
                        </div>
                     
                        <br/>
                        <br/>
                        <input type="submit" style={{backgroundColor:'#FFA600',padding:'7px 7px',borderRadius:'8px',fontSize:'16px',fontFamily:'Franklin Gothic Medium'}} />
                        
                    </form>
    
                </div>
                </div>
                
            )
        }
        return(
            
            <div style={{position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-45%, -60%)',padding:'40px 90px',backgroundColor:'#003F5C',borderRadius:'10px'}}>
                <h1 style={{textAlign:'center',color:'white'}}>LOG IN</h1>
                <form onSubmit={this.submitForm}>
                    <h1 style={{fontSize:'16px',color:'white'}}>Username</h1>
                    <input style={{display:'block',width:'100%',padding:'10px 15px',borderRadius:'8px'}} type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange} required/>
                    <br/>
                    <br/>
                    <h2 style={{fontSize:'16px',color:'white'}}>Password</h2>
                    <input style={{display:'block',width:'100%',padding:'10px 15px',borderRadius:'8px'}} type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange} required/>
                    <br/>
                    <br/>
                    <input type="submit" style={{backgroundColor:'#FFA600',padding:'7px 7px',borderRadius:'8px',fontSize:'16px',fontFamily:'Franklin Gothic Medium'}} />
                    
                </form>

            </div>
        )
    }
}

