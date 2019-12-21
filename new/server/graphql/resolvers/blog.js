const BlogModel = require('../../models/blog');

module.exports = {
    blogs: async (args, request) => {
        if (!request.isAuth) {
            console.log("Error");
            throw new Error("Unauthenticated");
        }
        const uid = request.userId;
        return BlogModel.find({ creator: uid })
            .then((blogs) => {
                return blogs.map(blog => {
                    return { ...blog._doc, _id: blog.id };
                })
            }).catch((err) => {
                console.log(err);
            })
    },
    createBlog: async (args, request) => {
        if (!request.isAuth) {
            console.log("Authentication Error!");
            throw new Error("Unauthenticated");
        }
        const uid = request.userId;
        const blog = new BlogModel({
            title: args.blogInput.title,
            image: args.blogInput.image,
            body: args.blogInput.body,
            creator: uid,
            created: new Date().toDateString()
        })
        const result = await blog.save();
        console.log(result);
        return { ...result._doc };
    },
    blogDetails: async ({ blogId }, request) => {
        //5dfb379e6c9f112c98d3f2d3
        if (!request.isAuth) {
            console.log("Authentication Error!");
            throw new Error("Unauthenticated");
        }
        return BlogModel.find({ _id: blogId })
            .then(blogs => {
                return {
                    title: blogs[0].title,
                    image: blogs[0].image,
                    body: blogs[0].body,
                    creator: blogs[0].creator,
                    created: blogs[0].created
                }
            })
    },
    blogUpdate: async ({ blogId, newBody }, request) => {
        if (!request.isAuth) {
            console.log("Authentication Error!");
            throw new Error("Unauthenticated");
        }
        const res = await BlogModel.updateOne({ _id: blogId }, { body: newBody })        
        if (res.nModified == 1)
            return "True";
        else return "False";
    },
    blogDelete: async ({ blogId }, request) => {
        if (!request.isAuth) {
            console.log("Authentication Error!");
            throw new Error("Unauthenticated");
        }
        const res = await BlogModel.deleteOne({ _id: blogId })     
        if (res.ok == 1)
            return "True"
        else 
            return "False"
    },
    getAllBlogs: async (args, request)=>{
        return BlogModel.find()
        .then((blogs)=>{
            console.log(blogs);
            return blogs.map(blog=>{
                return {...blog._doc, _id:blog.id};
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
}