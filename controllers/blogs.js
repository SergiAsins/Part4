import express from 'express';
import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
//import User from '../models/user.js';
const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {
    //const blogs = await Blog.find({}).populate('user', {username: 1, name:1})
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post('/', async (request, response, next) => {
    const body = request.body;

    try {
        const { title, author, url, likes, comments } = body;

        if (!title || !author || !url) {
            return response.status(400).json({ error: 'title, author, and url are required' });
        }

        // Uncomment the following lines when the user model and token functionality are ready
        // const token = request.token;
        // const decodedToken = jwt.verify(token, process.env.SECRET);
        // const user = await User.findById(decodedToken.id);

        // Simulate user in the meanwhile
        const user = { _id: 'dummyuserid' };

        if (!body.comments) {
            body.comments = [];
        }
        
        //GitHub say body.title and so on...
        const blog = new Blog({
            title: title,
            author: author,
            url: url,
            likes: likes || 0,
            comments: comments,
            //user: user._id
        });

        const savedBlog = await blog.save();
        console.log(`added ${blog.title} to the blog list`);
        // logger.log(`added ${blog.title} to the blog list`);
        // user.blogs = user.blogs.concat(savedBlog._id);
        // await user.save();
        // logger.info(`blog linked to user ${user.username}`);

        response.status(201).json(savedBlog.toJSON());
    } catch (exception) {
        next(exception);
    }
});

blogRouter.delete('/:id', async (request, response, next) => {
    // Uncomment the following lines when the user model and token functionality are ready
    // const token = request.token;
    // const decodedToken = jwt.verify(token, process.env.SECRET);
    // const user = await User.findById(decodedToken.id);
    // const blogToDelete = await Blog.findById(request.params.id);

    // Simulate user and blogToDelete for now
    const user = { _id: 'dummyuserid' };
    const blogToDelete = { user: { _id: 'dummyuserid' } };

    if (blogToDelete.user._id.toString() === user._id.toString()) {
        try {
            await Blog.findByIdAndRemove(request.params.id);
            response.status(204).end();
        } catch (exception) {
            next(exception);
        }
    } else {
        return response.status(401).json({ error: 'Unauthorized' });
    }
});

export default blogRouter;
