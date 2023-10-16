const express = require('express');
const conn = require("./db/connection");
const Student = require('./models/students');

const app = express();
const port = process.env.PORT || 8000 ;

app.use(express.json());

// Adding new student Data 
app.post('/students',async(req,res) => {
    console.log(req.body); 
    const user = new Student(req.body);

    try{
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
   
})



// for obtaining data using id  
app.get('/students/:id',async(req,res) => {
   try{
       const id = req.params.id;
       const  studentData = await Student.findById(id) ;

       if(studentData){
           res.status(200).send(studentData);
           console.log(studentData);
       }
       else{
          res.status(400)
       }
   }catch(err){
        res.status(400).json({ message : "please mention correct id"});
   }

})


app.patch('/students/:id', async(req,res) => {
    try{
          const id = req.params.id;
          const updateStudent = await Student.findByIdAndUpdate(id, req.body);
          res.status(200).send(updateStudent);
    }catch{
          res.status(400).json({message : " Student not found "})
    }
})


// Deleting record usinfg id 
app.delete('/students/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(id);
        res.status(200).send(deleteStudent);
    }catch{
        res.status(400).json({message :" Student not found "})
    }
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})