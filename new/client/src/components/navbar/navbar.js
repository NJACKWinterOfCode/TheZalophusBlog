import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'


const NavbarComponent=(props)=>
{
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        props.changeState(false);
        window.location.reload();
      }
    const login=(type)=>{
        props.history.push(`/${type}`);
    }

    return(
        <React.Fragment>
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Navbar.Brand>
                    <Link to="/" className="text-dark">
                        <i className="chess king icon iconh text-dark"></i>
                        TheZalophusBlog
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link to="/" className="text-dark">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/new" className="text-dark">New Blog</Link>
                        </Nav.Link>
                    </Nav>
                    { props.isLoggedin===false ? <button className="btn btn-sm btn-warning mr-2" onClick={()=>{ login('login') }}>Login</button> : null }
                    { props.isLoggedin===false ? <button className="btn btn-sm btn-warning" onClick={()=>{ login('signup') }}>Sign Up</button> : null }
                    { props.isLoggedin===true ? <button className="btn btn-sm btn-warning" onClick={ logout }>Logout</button> : null }
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default withRouter(NavbarComponent);