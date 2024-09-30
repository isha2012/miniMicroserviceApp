import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import ListComments from "./ListComments";
// import ListComments from "./ListComments";

// import io  from 'socket.io-client';

// const newSocket = io('http://localhost:3001');

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>("http://localhost:5000/posts");

        console.log(response.data);

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();

    // setSocket(newSocket);

    // newSocket.on('postAdded', (newPost: Post) => {
    //     setPosts((prevPosts) => [...prevPosts, newPost]);
    // });

    // return () => {
    //     newSocket.disconnect();
    // };
  }, []);

  interface Comment {
    id: string;
    content: string;
  }

  interface Post {
    id: string;
    title: string;
    comments: Comment[]; // this is a placeholder. Replace with actual comments from your database.
    // content: string;
  }


  const renderedPosts = Object.values(posts as Post[]).map((post: Post) => {
    return (
      // <div className=" card-group" >
      <div className="card" key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <div>
          {/* {post.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li> 
          ))} */}

          <ListComments comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>

     </div>
    );
  });

  return (
    <div className="card-grid" style={{ display: "flex", flexWrap: "wrap" }}>
      {/* <h1>Post List</h1> */}

      {renderedPosts}
    </div>
  );
};

export default PostList;
