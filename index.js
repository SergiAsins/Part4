import http from 'http';
//import app from './app.js'; //sol·lució GitHub
import mongoose from 'mongoose';
import express from 'express'
import blogRouter from './controllers/blogs.js';
import config from './utils/config.js'; //sol·lució GitHub
import logger from './utils/logger.js'; //sol·lució GitHub

const app = express();
const server = http.createServer(app)

//per a borrar
const url = 'mongodb+srv://HasanAsins:HamdulilahElLoco666@clusterappphonebook.hcwfwel.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAppPhonebook';

mongoose.connect(url).then(() => {
    console.log('connected to MongoDB');
}).catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
});

app.use(express.json());  // Asegúrate de que este middleware esté configurado

//app.use('/controllers/blogs', blogRouter);
app.use('/api/blogs', blogRouter);

/* 
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = new mongoose.model('Blog', blogSchema);

const mongoUrl = 'mongodb+srv://HasanAsins:HamdulilahElLoco666@clusterappphonebook.hcwfwel.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAppPhonebook';
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        });
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
}); */

//gpt: const server = http.createServer(app)
const PORT = 3003;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



