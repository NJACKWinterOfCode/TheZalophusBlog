import React,{ useState } from 'react';
import { withRouter } from 'react-router-dom'

const CreateBlogForm=(props)=>
{
    const [ title, setTitle ]=useState('');
    const [ imageUrl, setImageUrl ]=useState('');
    const [ blogBody, setBlogBody ]=useState('');

    //set all the current value
    const handleChange=(e, setter)=>{
        setter(e.target.value);
    }

    //upload blog details to server
    const upload=(e)=>{
        e.preventDefault();
        const token=localStorage.getItem("token");
        const requestBody={
            query:`
            mutation {
                createBlog(blogInput:{ title: "${title}", image:"${imageUrl}", body:"${blogBody}" }) {
                    title
                }
            }
            `
        }

        fetch('http://localhost:8000/graphql',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=>{ return res.json(); })
        .then((res)=>{
            console.log(res);
            if(res.errors && res.errors[0].message==="Unauthenticated"){
                //if unauthenticated then redirect to login page
                props.history.push("/");
            }

            //else redirect user to home route to see created blogs
            props.history.push("/home");
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
        {/* <NavbarComponent props={ props } /> */}
        <div className="ui main text container segment mt-5">
            <div className="ui huge header">NEW BLOG</div>
            <form className="ui form" onSubmit={ upload }>
                <div className="field">
                    <label>Title</label>
                    <input type="text" placeholder="title" onChange={(e)=>{handleChange(e, setTitle)}} required/>
                </div>
                <div className="field">
                    <label>Image</label>
                    <input type="text" placeholder="image" onChange={(e)=>{ handleChange(e, setImageUrl) }} />
                </div>
                <div className="field">
                        <label>Blog Content</label>
                        <textarea required onChange={(e)=>{ handleChange(e, setBlogBody) }}></textarea>
                </div>
                <input className="ui violet inverted button" type="submit"/>
            </form>
        </div>
        </>
    )
}

export default withRouter(CreateBlogForm);