import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

interface commentsInterface {
    id: string;
    content: string;
}
const commentsByPostId: { [key: string]: [commentsInterface]} = {

}

app.get('/posts/:id/comments', (req: Request, res: Response) => {
    // res.send(posts);

    console.log(req.params.id);
    
    res.send(commentsByPostId[req.params.id] || []  )
})

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    
    comments.push({
        id: commentId, content 
    });

    commentsByPostId[req.params.id] = comments;

    console.log("All Done here!!!!!!!!!!!");
    let newComment = {
        id: commentId,
        content,
        postId: req.params.id,
    }
    

    try {
        await axios.post('http://localhost:4005/events', {
            type: "comment_added",
            data: {
                id: commentId,
                content,
                postId: req.params.id,
            }
        });
    } catch (error) {
        console.error("Error sending event to event bus:", error);
    }

    res.status(201).send(comments);
});

app.post("/events", (req: Request, res: Response) => {
    console.log("Comments Event triggered", req.body.type);
    res.send({  })

})

app.listen(3002, () => {
    console.log('Comments running on 3002')
})
export default app;
