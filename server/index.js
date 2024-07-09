require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./Utils/DB');
const PORT = process.env.PORT
const userRoutes = require('./Routes/userRoutes');
const leadRoutes = require('./Routes/leadRoutes');
const employeeRoutes = require('./Routes/employeeRoutes');
const cors = require('cors');

app.get('/',(req,res)=>{
    res.send('Hello from the server side');
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use('/api/users',userRoutes);
app.use('/api/leads',leadRoutes);
app.use('/api/employees',employeeRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running @ ${PORT}`)
    })
})