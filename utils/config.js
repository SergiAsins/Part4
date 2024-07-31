import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI ||'mongodb+srv://HasanAsins:HamdulilahElLoco666@clusterappphonebook.hcwfwel.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAppPhonebook';;
const PORT = process.env.PORT || 3003;

/*if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST.MONGODB_URI
} else if (process.env.NODE_ENV === 'development') {
    MONGODB_URI = process.env.DEV_MONGODB_URI
}*/

export default MONGODB_URI;

