
const express = require('express')
const shortid = require('shortid')

const server = express();


let users=[]

server.use(express.json());

server.get('/', (req, res)=>{
    res.status(200).json({api: "running"});
})

server.post('/api/users', (req, res)=>{
//you check errors by flipping/changing your if statement to !=
    const userInfo= req.body
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
      } else {
        users.push(userInfo);
        userInfo.id = shortid.generate();
        res.status(201).json(userInfo)
        res.status(500).json({errorMessage: " error saving the user to the database"})
      }
    });


server.get('/api/users', (req, res)=>{
    res.status(200).json(users);
    res.status(500).json({errorMessage: "users information could not be retrieved"})
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(item => item.id === id);
    res.status(200).json(user) 
    res.status(404).json({ message: 'The user with the specified ID does not exist.' }) 
    res.status(500).json({ errorMessage: 'The user information could not be retrieved' })
  });

server.delete('api/users/:id', (req, res)=>{
    const id = req.params.id;
    const delUser = req.body
    res.status(204).json(delUser)
    res.status(404).json({ message: 'The user with the specified ID does not exist.' }) 
    res.status(500).json({errorMessage: "The user could not be removed"})
    
})





const PORT = 5000;
server.listen(PORT, ()=>console.log(`\n ** API on http://localhost:${PORT} **\n`));

