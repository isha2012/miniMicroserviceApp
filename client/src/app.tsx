import React from 'react'
import CreatePostForm from './postCreate';
import PostList from './postList';

const App = () => {
    return <div className='container'>
       <h1>Create Post</h1>
       <CreatePostForm />
       <hr />
       <h1>Posts</h1>
       < PostList />
       </div>
}

export default App;