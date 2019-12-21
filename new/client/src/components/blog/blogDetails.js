import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import NavbarComponent from '../navbar/navbar';

const BlogDetails = (props) => {
	const [blogId, setBlogId] = useState('');
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [body, setBody] = useState('');
	const [creator, setCreator] = useState('')
	const [created, setCreated] = useState('')

	const [editMode, setEditMode] = useState('')
	const [newBody, setNewBody] = useState('')

	function GetID() {
		let { ID } = useParams();
		setBlogId(ID);
		getData(blogId);	
		return null;
	}

	useEffect(() => {
		setEditMode(false);
		console.log("Id", blogId);
		
	}, [])
	
	const getData = (blogId) => {
		const token = localStorage.getItem("token");

		const requestBody = {
			query: `
      query {
        blogDetails(blogId: "${blogId}") {
          title
          image
          body
          creator
          created
        }
      }
      `
		}

		fetch("http://localhost:8000/graphql", {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		}).then(res => {
			return res.json();
		}).then((res) => {
			if (res.errors && res.errors[0].message === "Unauthenticated") {
				props.history.push("/");
			}

			setTitle(res.data.blogDetails.title)
			setImage(res.data.blogDetails.image)
			setBody(res.data.blogDetails.body)
			setCreator(res.data.blogDetails.creator)
			setCreated(res.data.blogDetails.created)

		}).catch((err) => {
			console.log(err);
		})

	}

	const updateBlog = (blogId) => {
		const token = localStorage.getItem("token");

		const requestBody = {
			query: `
				mutation {
					blogUpdate(blogId: "${blogId}", newBody: "${newBody}")
				}
					`
		}

		fetch("http://localhost:8000/graphql", {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		}).then(res => {
			return res.json();
		}).then((res) => {
			if (res.errors && res.errors[0].message === "Unauthenticated") {
				props.history.push("/");
			}
			console.log(res, res.data.blogUpdate);

			if (res.data.blogUpdate == "True") {
				alert("Blog Update");
				setEditMode(false);
				setBody(newBody);
			}
			else {
				alert("Something went wrong");
				setEditMode(false);
			}

		}).catch((err) => {
			console.log(err);
		})

	}

	const deleteBlog = (blogId) => {
		const token = localStorage.getItem("token");

		const requestBody = {
			query: `
				mutation {
					blogDelete(blogId: "${blogId}")
				}
					`
		}

		fetch("http://localhost:8000/graphql", {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		}).then(res => {
			return res.json();
		}).then((res) => {
			if (res.errors && res.errors[0].message === "Unauthenticated") {
				props.history.push("/");
			}

			console.log("Delete ", res);


			if (res.data.blogDelete == "True") {
				alert("Blog Deleted");
				props.history.push("/home");
			}
			else {
				alert("Something went wrong");
			}

		}).catch((err) => {
			console.log(err);
		})
	}

	const showBlog = () => {
		return (
			<div className="ui main text container segment mt-5">
				<div className="ui huge header">{title}</div>
				<div className="ui text segment mt-15">
					<p>Created At : {created}</p><br /><br />
					{body}
				</div>
				<div className="ui text segment mt-2">
					<button onClick={() => {
						setNewBody(body)
						setEditMode(true);
					}}> Edit </button>
					<button onClick={() => {
						deleteBlog(blogId);
					}}> Delete </button>
				</div>
			</div>
		)
	}

	const editBlog = () => {
		const setInfo = (e, setter) => {
			setter(e.target.value);
		}

		return (
			<div className="ui main text container segment mt-5">
				<div className="ui huge header">{title}</div>
				<div className="ui text segment mt-15" >
					<textarea className="ui text segment mt-10" value={newBody} onChange={(e) => { setInfo(e, setNewBody) }} />
				</div>
				<div className="ui text segment mt-2">
					<button onClick={() => {
						setEditMode(false);
						updateBlog(blogId);
					}}> Done </button>
					<button onClick={() => {
						setEditMode(false);
					}}> Cancel </button>
				</div>
			</div>
		)
	}

	return (
		<Fragment>
			<Switch>
				<Route path="/blog/:ID" children={<GetID />} />
			</Switch>

			<NavbarComponent />
			{!editMode ? showBlog() : editBlog()}
		</Fragment>
	)
}

export default BlogDetails;