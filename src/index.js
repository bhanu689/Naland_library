import http from 'http'
import "dotenv/config";
import { connectDB } from './db/db.connect.js';
import { app } from './app.js';

const server = http.createServer(app);
const port = process.env.PORT || 5002;

connectDB().then(()=>{
    server.listen(port,()=>{
        console.log(`Server is running on the PORT : ${port}`);
    })
})
