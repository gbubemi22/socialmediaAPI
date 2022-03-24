const express = require('express')
const app = express()
const mongoose = require('mongoose')


const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')



const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config();

mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log("Connected to MongoDB");
    }
);





app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);




app.listen(3000, () => {
    console.log("Backend Server is running!")
})