import express, { Request, Response } from 'express';
// import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts)
})


let posts: { [key: string]: { id: string, title: string, comments: { id: string, content: string }[] } } = {};

app.post('/events', (req: Request, res: Response) => {

    console.log(req.body, "%%%%%%%%%%%%%%%%%%")
    const { type, data } = req.body;

    if (type === 'post_added') {    

        console.log("Post is added@@@@@@@@@@@@@@@");
        
        const { id, title } = data;
        posts[id] = {
            id, title, comments: []
        };
    }


    if(type === "comment_added") {
        const {
            id, content, postId
        } = data;

        const post = posts[postId];
        if (post) {
            post.comments.push({
                id, content
            });
        } else {
            console.error(`Post with id ${postId} not found.`);
        }


    }

    console.log({posts})

    res.send({});
})

app.listen(5000, () => {
    console.log('Queries running on 5000')
})
export default app;
