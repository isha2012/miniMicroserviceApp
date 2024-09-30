import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';
import bodyParser from 'body-parser';
const app = express();    
// app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


//option 3 query service only listens for update events.
app.post('/events', async (req:Request, res: Response) => {

    const {
        type, data
    } = req.body;


    console.log("In the moderation function #################");
    

    if(type === "comment_added") {

        console.log(data);
        
        // let status = data.content.includes('orange');
        let status;
        if(data.content.includes('orange')) {
            status="rejected";
        } else {
            status="approved";
        }

        console.log(status);
        
        // console.log( data.content.includes('orange'), "######sttaus updated");
        

        await axios.post('http://localhost:4005/events', {
            type: 'comment_moderated',
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status,

            }
        })  


    }
    res.send({})
}) 



app.listen(3003, () => {
    console.log('Moderations running on 3003')
})
export default app;
