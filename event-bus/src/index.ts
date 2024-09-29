import express, { Request, Response } from 'express';


import bodyParser from 'body-parser';
import axios from 'axios';
const app = express();
// app.use(cors());    
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/events', async (req: Request, res: Response) => {
    const event = req.body;

    console.log("Event api called");
    

    //post events
    await axios.post('http://localhost:3001/events', event);

    console.log(event, "Event api called for post");
    
    //comment events
    await axios.post('http://localhost:3002/events', event);
    console.log(event, "Event api   called for comment");
    
    //query service
    await axios.post('http://localhost:5000/events', event);
    console.log(event, "Event api called for query");
    
    // axios.post('http://localhost:4000/events', event);

    res.send({ status: "okay"})
})



app.listen(4005, () => {
    console.log('Event Bus running on 4005')
})
export default app;
