import React from 'react';
import { Link } from 'react-router-dom'

const Blog=(props)=>
{
    console.log(props);
    const { blogs }=props;
    const blogsView=blogs.length>0 ? blogs.map((item, i)=>{
        return(
            <div className="ui main text container mt-4" key={ i }>
                <div className="ui top attached segment">
                    <div className="ui divided items">
                            <div className="item">
                                <div className="image">
                                    <img className="ui rounded image" src={ item.image } alt="pic" />
                                </div>
                                <div className="content">
                                        <Link style={{width:"440px",wordWrap:"break-word"}} className="header" to={ '/blog/'+item._id } >{ item.title }</Link>
                                    <div className="meta">
                                        <span>{ item.created.toString() }</span>
                                    </div>
                                    <div className="description" style={{width:"440px",wordWrap:"break-word"}}>
                                        <p>{ item.body.substring(0,150) }...</p>
                                    </div>
                                    <div className="extra">
                                        <Link className="ui violet basic button readm" to={ '/blog/'+item._id }>
                                            Read More
                                            <i className="right chevron icon iconRead"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }) : <p>No blogs posted yet</p>
    return(
        <React.Fragment>
            { blogsView }
        </React.Fragment>
    )
}

export default React.memo(Blog);