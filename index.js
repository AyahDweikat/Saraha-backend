import express from 'express';
import initApp from './src/app.router.js';
import connectDB from './DB/connection.js';
const app = express();
const PORT = process.env.PORT;


initApp(app, express)
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})





