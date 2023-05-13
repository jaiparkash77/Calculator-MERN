const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

dotenv.config({path: "backend/config/.env"});
connectDatabase();

// create server
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on port ${process.env.PORT}`)
});

