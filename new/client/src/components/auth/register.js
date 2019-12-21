import React, { Component } from 'react';
import './Auth.css';

class Register extends Component {
  state = {
    isLogin: true,
    image:'',
    fname:'',
    lname:'',
    username:'',
    dpas:'',
    birthDate:''
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  updateInfo=(e)=>{
    this.setState({ [e.target.name]:e.target.value })
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const { fname, lname,username,image, dpas, birthDate }=this.state;
    if(dpas!==password){
        return;
    }

    let requestBody = {
        query: `
          mutation {
            createUser(userInput: { fname:"${fname}", lname:"${lname}", username:"${username}", email: "${email}", password: "${password}",birthDate:"${birthDate}", image:"${image}"}) {
              fname
            }
          }
        `
    };
    
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
    })
    .then(resData => {
        console.log(resData);
        if(resData.data.createUser){
          alert("Registered");
        }else{
          alert("Error");
        }
      })
      .catch(err => {
        alert("Error");
        console.log(err);
      });
  };

  uploadFile=async (e)=>{
    const convertTobase64=(file)=>{
      return new Promise((resolve, reject)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function()
        {
          resolve(reader.result);
        }
        reader.onerror=function()
        {
          reject("Error");
        }
      })
    }

    convertTobase64(e.target.files[0])
    .then((res)=>{
      this.setState({ image:res })
    })
  }

  render() {
    return (
      <>
        <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="fname" onChange={this.updateInfo} required />
            </div>

            <div className="form-control mt-1">
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lname" onChange={this.updateInfo} required />
            </div>

            <div className="form-control mt-1">
                <label htmlFor="uname">User Name</label>
                <input type="text" id="uname" name="username" onChange={this.updateInfo} required />
            </div>


            <div className="form-control mt-1">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref={this.emailEl} required />
            </div>
            
            <div className="form-control mt-1">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl} required />
            </div>


            <div className="form-control mt-1">
                <label htmlFor="dpassword">Confirm Password</label>
                <input type="password" id="dpassword" name="dpas" onChange={this.updateInfo} required />
            </div>
          
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" onChange={ this.uploadFile } required />
                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
            </div>


            <div className="form-control mt-2">
                <label htmlFor="bday"></label>
                <input type="date" id="bday" name="birthDate" required onChange={this.updateInfo} />
            </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-sm btn-warning">Signup</button>
          </div>
        </form>
      </>
    );
  }
}

export default Register;