const { error } = require('console');
const express=require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

var data;
const fs=require("fs");
fs.readFile('data.json',(error,jsonData)=>{
    if(error){
        console.error('File cannot be found:',error);
    }
    else{
        data=JSON.parse(jsonData);
    }
})

// GET 
router.get('/getData',(req,res)=>{
    console.log("GET request processing");
    res.send(data);
})

// POST
router.post('/postData',(req,res)=>{
    console.log("POST request processing");
    data.push(req.body);
    const jsonString=JSON.stringify(data);
    fs.writeFile('data.json',jsonString,error=>{
        if(error){
            console.log('Error writing file',error);
            res.send("Request not allowed");
        }
        else{
            console.log("Data added to file");
            res.send(data);
        }
    })
})

// PUT
router.put('/putData/:ind',(req,res)=>{
    const index=req.params.ind;
    console.log("PUT request processing");
    data[index]=req.body;
    const jsonString=JSON.stringify(data);
    fs.writeFile('data.json',jsonString,error=>{
        if(error){
            console.log('Error updating file',error);
            res.send("Request not allowed");
        }
        else{
            console.log("Data updated successfully");
            res.send(data);
        }
    })
})
// DELETE
router.delete('/deleteData/:ind',(req,res)=>{
    const index=req.params.ind;
    console.log("DELETE request processing");
    data.splice(index,1);
    const jsonString=JSON.stringify(data);
    fs.writeFile('data.json',jsonString,error=>{
        if(error){
            console.log('Error deleting file',error);
            res.send("Request not allowed")
        }
        else{
            console.log("File successfully deleted");
            res.send(data);
        }
    })
})
module.exports=router;


