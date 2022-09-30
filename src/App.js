import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './Styles/index.css';

import Home from './Pages/Home';
// import NewPost from './Pages/NewPost';
import Post from "./Pages/Post";

function App() {

  let [ postData, setPostData ] = useState([]);
  let [ comments, setComments ] = useState([]);

  // Fetch data from api.
  useEffect(() => {
      fetch("http://localhost:3000")
      .then( res => res.json())
      .then(
        (res) => {
          console.log(res);
          setPostData(res.posts);
          setComments(res.comments);
        }
      )
    }, []);


  return (
    <div className="App">
      <div className='content-wrapper'>

        <BrowserRouter basename='/blog'>

          <Routes>

            <Route 
              exact
              path="/" 
              element={ <Navigate to="/posts" /> } 
            />

            <Route 
              exact 
              path="/posts" 
              element = { <Home postData={postData} />} 
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
