import React, { useEffect, useState } from "react";
import axios from "axios";

// interface CommentCreateProps {
//     postId: string; // or number, depending on your API
//   }


// const ListComments: React.FC<CommentCreateProps> = ({ postId}) => {

//     const [ comments, setComments] = useState<Comment[]>([]);

//     interface Comment {
//         id: string;
//         // title: string;
//         content: string;
//       }

//     useEffect(() => {
//         const fetchComments = async () => {
//           try {
//             const response = await axios.get<{ [key: string]: Comment }>(`http://localhost:3002/posts/${postId}/comments`);
//             const commentsArray = Object.values(response.data);
//             setComments(commentsArray);
//           } catch (error) {
//             console.error("Error fetching posts:", error);
//           }
//         };
    
//         fetchComments();
//       }, [postId]);


//       const renderedComments = comments.map((comment: Comment) => {
//         return (
//           <div key={comment.id}>
//              <ul className="list-group list-group-flush">
//             <li className="list-group-item">{comment.content}</li>
//             </ul>
//           </div>
//         );
//       });

      
//     return <div>
//         {renderedComments}
//     </div>
// }

//@ts-ignore
const ListComments = ({comments}) => {

//@ts-ignore
  const renderedComments = comments.map(comment => {
    let content;

    if(comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'pending') {
      content = "Comment in Moderation";
    } else {
      content = 'Comment is rejected';
    }

    console.log(content);
    

    return <li key={comment.id}>{content}</li> 
  })


  return <ul>{renderedComments}</ul>
}

export default ListComments