import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './Styles/index.css';

import Home from './Pages/Home';
import Post from "./Pages/Post";
import CreatePost from "./Pages/CreatePost";

function App() {

  let [ postData, setPostData ] = useState([]);

  // Fetch blog data from api.
  useEffect(() => {
      axios.get("http://localhost:3000/api/posts")
      .then(res => {
        setPostData(res.data);
      })
    }, []);


  return (
    <div className="App">
      <div className='content-wrapper'>

        <BrowserRouter basename='/'>

          <Routes>

            <Route 
              exact 
              path="/" 
              element = { <Home postData={postData} />} 
            />

            <Route 
              exact
              path="/post/create_post"
              element = { <CreatePost /> }
            />

            {postData.map((post) => {
              return (
                <Route 
                  exact 
                  path={`/post/${post._id}`}
                  key={post._id}
                  element = { <Post props={post}/>}
                />
              )
            })}

          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
