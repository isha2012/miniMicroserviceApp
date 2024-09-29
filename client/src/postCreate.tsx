import React, { useEffect, useState } from "react";
import axios from "axios";

import io  from "socket.io-client";
import {Socket}  from "socket.io-client";




const CreatePostForm = () => {

    const [title, setTitle] = useState<string>('');
    const [posts, setPosts] = useState<Post[]>([]);
    // const [socket, setSocket] = useState<typeof Socket | null>(null); // Correctly define socket state

    interface Post {
        title: string;
    }


    // useEffect(() => {
    //     const newSocket: typeof Socket = io('http://localhost:3001');
    //     setSocket(newSocket)
    //     // Listen for new posts via WebSocket when the component mounts
    //     newSocket.on('postAdded', (newPost: Post) => {
    //       setPosts((prevPosts) => [...prevPosts, newPost]);
    //     });
    
    //     // Clean up the socket listener when the component unmounts
    //     return () => {
    //         newSocket.off('postAdded');
    //     };
    //   }, []); // Empty dependency array to run once on mount


    const onSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();



        const newPost = {
            title
        }
    
        await axios.post('http://localhost:3001/posts', newPost);

        setTitle('');   
        //  // Listen for new posts via WebSocket
        // socket.on('postAdded', (newPost: Post) => {
        //     setPosts((prevPosts) => [...prevPosts, newPost]);
        // });

        // return () => {
        //     socket.off('postAdded');
        // };
    
        
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label >Title</label>
                <input value={title} onChange={e=>setTitle(e.target.value)} className="form-control"></input>
            </div>
           
            <button className="btn btn-primary">Submit</button>
        </form>
    );
}

export default CreatePostForm