import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import http from 'http';

import { Server } from 'socket.io';

// import bodyParser from 'body-parser';
const app = express();
app.use(cors());    
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

interface Post {
    id: string;
    title: string;
}

let posts: Post[] = [];

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "*", // React app's origin
      methods: ["GET", "POST"],
      credentials: true, // Allow credentials
    }
  });

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
})

app.post('/posts', (req: Request, res: Response) => {
    const id = randomBytes(4).toString('hex');

    const {title} = req.body;

    // posts[id]={
    //     id, title
    // };

    const newPost = {
        id, title
    }

    posts.push(newPost)

    io.emit('postAdded', newPost);

    console.log("Event EMitted");
    


    res.status(201).send(newPost);
});


  // Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected', socket.id);
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  

app.listen(3001, () => {
    console.log('Posts running on 3001')
})
export default app;
