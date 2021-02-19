const Todos = require('../models/Todos');
const {users} = require('../models/Users');
const {ObjectId} = require("mongoose").Types;


exports.getTodos = async(req,res)=>{    
   try{
    const {email} = req.query;
    const user = await users.findOne({"email":email});
    const tasks = await Todos.findOne({ userId: user._id }).exec();
    return res.status(200).json(tasks);  
   } catch(e){
       console.log(e);
       return res.status(500).json('Internal server error');
   }
}

 exports.postTodo = async(req,res)=>{    
    try{
      const {newTodos} = req.body;
      const {email,id} = req.query;
      const user = await users.findOne({"email":email});
      const todos = await Todos.findOne({ userId: user._id }).exec();
      if (!todos) {
          await Todos.create({
            userId: user._id,
            todos: newTodos,
          });
        } else {
          todos.todos = newTodos;
          await todos.save();
        }
      return res.status(201).json(newTodos);    
    } catch(e){
        console.log(e);
        return res.status(500).json('Internal server error');
    }
 };


//  exports.deleteTodo = async(req,res)=>{   
//     try{
//         const {email} = req.query;
//         const {id} = req.body;
//         const user = await users.findOne({"email":email});
//         const task = await Todos.findOne({ userId: user._id }[0]).exec();    
//         // const tasks = await Todos.findByIdAndDelete(id);
//         console.log(task)
//         return res.status(200).json(task);   
//     } catch(e){
//         console.log(e);
//         return res.status(500).json('Internal server error');
//     }
//  };