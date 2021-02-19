const { Router } = require('express');
const router = Router();


const {getUsers,getUser,postUser,loginUser,deleteUser} = require('../controllers/userController');
const {postImg,gcpUpdate} = require('../controllers/imageController');
const {getTodos,postTodo} = require('../controllers/todoController');

router.get('/', function (req, res) {
  res.send('API funcionando!')
});



router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/register',postUser);
router.post('/login',loginUser);
router.delete('/users/:id',deleteUser);

router.get('/todos',getTodos); 
router.post('/image',postImg,gcpUpdate); 
router.post('/todos',postTodo); 

module.exports = router;