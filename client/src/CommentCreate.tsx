import { useState } from "react"
import axios from "axios"

interface CommentCreateProps {
    postId: string; // or number, depending on your API
  }

const CommentCreate: React.FC<CommentCreateProps> = ({ postId  }) => {

    const [ content, setContent] = useState('')

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        await axios.post(`http://localhost:3002/posts/${postId}/comments`, {content})

        setContent('');
    };

    return <div>
        {/* <h2>New Comment</h2> */}
        <form onSubmit={onSubmit}>
            <div>
                <label>New Comment</label>
                <input value={content} onChange={e=> setContent(e.target.value)}></input>
            </div>
            <button className="btn btn-primary" type="submit">Submit</button> {/* Add type="submit" */}
           
        </form>
    </div>
}

export default CommentCreate;