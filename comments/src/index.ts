import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
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
    res.send(commentsByPostId[req.params.id] || []  )
})

app.post('/posts/:id/comments', (req: Request, res: Response) => {
    const commentsId = randomBytes(4).toString('hex');

    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    
    comments.push({
        id: commentsId, content 
    });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(3002, () => {
    console.log('Comments running on 3002')
})
export default app;
