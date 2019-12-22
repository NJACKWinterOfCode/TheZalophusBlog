import React,{ useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'

const ProfileView=(props)=>
{
    const [userDetails, setUserDetails]=useState({ fname:'', lname:'', username:'', image:'', description:'' });
    const [ isUser, setIsUser ]=useState();
    useEffect(()=>{
        const user=props.match.params.username;
        console.log(user);
        let requestBody={
            query:`
            mutation {
                getRandomUserDetails(RandomUserInput : { username:"${user}" }) {
                    _id
                    fname
                    lname
                    username
                    image
                    description
                }
            }
            `
        }
        const token=localStorage.getItem('token');
        fetch('http://localhost:8000/graphql',{
            method:'POST',
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log(res)
            const {_id, fname, lname, username, image, description }=res.data.getRandomUserDetails;
            const loggedInUser=localStorage.getItem('uid');
            console.log(loggedInUser);
            
            if(loggedInUser===_id){
                setIsUser(true);
            }else{
                setIsUser(false);
            }
            setUserDetails({...userDetails,fname, lname, username, image, description});
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const { fname, lname }=userDetails;
    return(
        <React.Fragment>
            <Row>
                <Col span={10}></Col>
                <Col span={8} style={{ marginTop:15 }}>
                    <h3>{ fname.charAt(0).toUpperCase()+fname.slice(1) } { lname.charAt(0).toUpperCase()+lname.slice(1) }</h3>
                    <h5>{ userDetails.description }</h5>
                    { isUser ? <button className="btn btn-primary" onClick={()=>{ props.history.push(`/edit/${userDetails.username}`) }}>EDIT</button> : null }
                </Col>
                <Col span={5} style={{ marginTop:15, marginRight:15 }}>
                    <img style={{ float:'left' }} src={  userDetails.image } alt="user" className="img-fluid" />
                </Col>
            </Row>
        </React.Fragment>
    )
}


export default ProfileView;