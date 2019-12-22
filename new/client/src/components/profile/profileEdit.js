import React,{ useEffect, useState } from 'react'
import { Row, Col, Input, Avatar, Button, Icon } from 'antd';

const Profile=()=>{
    const [ fname, setFname ]=useState();
    const [ lname, setLname ]=useState();
    const [ username, setUsername ]=useState();
    const [ email, setEmail ]=useState();
    const [ image, setImage ]=useState();
    const [ description, setDescription ]=useState();

    useEffect(()=>
    {
        const requestBody={
            query:`
            query {
                getUserDetails {
                    fname
                    lname
                    username
                    email
                    image
                    description
                }
            }
            `
        }

        const token=localStorage.getItem("token");
        fetch("http://localhost:8000/graphql",{
            method:'POST',
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((res)=>{ return  res.json()})
        .then((res)=>{
            // console.log(res.data);
            const { fname, lname, username, email, image, description }=res.data.getUserDetails;
            setFname(fname);
            setLname(lname);
            setUsername(username);
            setEmail(email);
            setImage(image);
            description==='null' ? setDescription('') : setDescription(description)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const updateInfo=(e, setter)=>{
        setter(e.target.value);
    }

    const createFileInput=()=>{
        const fileInput=document.createElement("input");
        fileInput.type="file";
        fileInput.click();
        fileInput.onchange=function(e){
            // console.log(e.target.files[0])
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
                setImage(res);
            })
        }
    }

    const submit=()=>{
        console.log(fname, lname, username, email, description);
        let requestBody = {
            query: `
              mutation {
                updateInfo(UpdateInput: { fname:"${fname}", lname:"${lname}", username:"${username}", email: "${email}", description:"${description}", image:"${image}"})
              }
            `
        };
        const token=localStorage.getItem("token");
        fetch("http://localhost:8000/graphql",{
            method:'POST',
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            // console.log(res);
            if(res.data.updateInfo){
                alert('Data Updated');
            }else{
                throw new Error('Error')
            }
        })
        .catch((err)=>{
            console.log(err);
            alert('Error');
        })
    }

    return(
        <React.Fragment>
            <Row>
                <Col span={3}></Col>
                <Col span={8} style={{ paddingTop:10 }}>
                    <h1>User Profile Image</h1>
                    { image ? <img src={image} alt="new" className="img-fluid" style={{ marginBottom:10 }} /> : <Avatar icon="user" /> }
                    <Button onClick={ createFileInput }>
                        <Icon type="upload" /> Update image
                    </Button>
                </Col>
                <Col span={1}></Col>
                <Col span={12} style={{ padding:20 }}>
                    <h1>User Details</h1>
                    <Row>
                        <Col span={12}>
                            <label style={{ fontWeight:'bold' }}>First Name</label>
                            <Input value={ fname } onChange={(e)=>{ updateInfo(e, setFname) }} />
                        </Col>
                        <Col span={11} style={{ marginLeft:2 }}>
                            <label style={{ fontWeight:'bold' }}>Last Name</label>
                            <Input value={ lname } onChange={(e)=>{ updateInfo(e, setLname) }} />
                        </Col>
                    </Row>
                    <Row style={{ paddingTop:10 }}>
                        <Col span={12}>
                            <label style={{ fontWeight:'bold' }}>Username</label>
                            <Input value={ username } onChange={(e)=>{ updateInfo(e, setUsername) }} />
                        </Col>
                        <Col span={11} style={{ marginLeft:2 }}>
                            <label style={{ fontWeight:'bold' }}>Email</label>
                            <Input value={ email } onChange={(e)=>{ updateInfo(e, setEmail) }} />
                        </Col>
                    </Row>
                    <Row style={{ paddingTop:10 }}>
                        <Col span={12}>
                            <label style={{ fontWeight:'bold' }}>Description</label>
                            <Input value={ description } onChange={(e)=>{ updateInfo(e, setDescription) }} />
                        </Col>
                    </Row>
                    <Row style={{ paddingTop:10 }}>
                        <Col span={12}>
                            <button className="btn btn-sm btn-warning" style={{ fontWeight:'bold' }} onClick={submit} >Save</button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Profile;