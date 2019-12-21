import React,{ useEffect, useState } from 'react';
import Blog from './blog/blog';
import CheckAuth from './auth/checkAuth';

const Homepage=(props)=>
{
  // console.log(props);
  const [blogs, setBlogs]=useState([]);
  const getData=(requestBody, type)=>{
    const token=localStorage.getItem("token");
    fetch("http://localhost:8000/graphql",{
      method:'POST',
      body:JSON.stringify(requestBody),
      headers:{
        'Content-Type':'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      return res.json();
    }).then((res)=>{
      console.log(res);
      type==='blogs' ? setBlogs(res.data.blogs) : setBlogs(res.data.getAllBlogs)
    }).catch((err)=>{
      console.log(err);
    })

  }
  
  useEffect(()=>{
    CheckAuth()
    .then(()=>{
      props.changeState(true);
      const requestBody={
        query:`
        query {
          blogs {
            _id
            title
            image
            body
            creator
            created
          }
        }
        `
      }
      const type='blogs';
      getData(requestBody, type);
    }).catch(()=>{
      console.log("Catch Block");
      props.changeState(false);
      const requestBody={
        query:`
        query {
          getAllBlogs {
            _id
            title
            image
            body
            creator
            created
          }
        }
        `
      }
      const type='getAllBlogs';
      getData(requestBody, type);
    })
  },[])
  return(
    <>
    {/* <NavbarComponent props={ props } /> */}
    <Blog blogs={ blogs } />
    </>
  )
}

export default Homepage;