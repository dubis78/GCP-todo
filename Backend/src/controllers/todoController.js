const Todos = require('../models/Todos');
const {users} = require('../models/Users');
const {ObjectId} = require("mongoose").Types;


exports.getTodos = async(req,res)=>{    
   try{
    const {email, pass} = req.query;
    const user = await users.findOne({"email":email});
    console.log(email, pass)
    if (!user || user.password !== pass) {
        res.status(403).json({message: "invalid access"});
        return;
    }
    const tasks = await Todos.findOne({ userId: user._id }).exec();
    return res.status(200).json(tasks);  
   } catch(e){
       console.log(e);
       return res.status(500).json('Internal server error');
   }
}


// export const getTodo = async(req,res)=>{        
//     try{
//         const id = req.params.id;
//         const task = await Todos.find({"_id":ObjectId(id)});
//         return res.status(200).json(task);
//        } catch(e){
//            console.log(e);
//            return res.status(500).json('Internal server error');
//        }
//  };


 exports.postTodo = async(req,res)=>{    
    try{    
        const {newTodos} = req.body;
        const {email, pass} = req.query;
        console.log(email, pass,req.body)
        const user = await users.findOne({"email":email});
        // if (!user || user.password !== pass) {
        //     res.status(403).json({message: "invalid access"});
        //     return;
        // }
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
        // const newTask = new Todos({text, timer, urgent, priority});
        // newTask.save();
        return res.status(201).json(newTodos);    
    } catch(e){
        console.log(e);
        return res.status(500).json('Internal server error');
    }
 };


//  export const deleteTodo = async(req,res)=>{   
//     try{     
//         const id = req.params.id;
//         const task = await Todos.findByIdAndDelete(id);
//         return res.json({message:`Todo deleted ${id}`})
//     } catch(e){
//         console.log(e);
//         return res.status(500).json('Internal server error');
//     }
//  };