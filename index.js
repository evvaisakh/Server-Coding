const express=require('express');
const app=new express();

const morgan=require('morgan');
app.use(morgan('dev'));

require('dotenv').config();
const PORT=process.env.PORT;

const api=require('./routes/crud');
app.use('/api',api);

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});