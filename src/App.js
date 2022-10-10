import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './Styles/index.css';

// Bootstrap Component Imports.
import BasicToast from './Components/Toast';

import Home from './Pages/Home';
import Post from "./Pages/Post";
import CreatePost from "./Pages/CreatePost";
import NavigationBar from './Components/NavigationBar';

function App() {

  let [ showToast, setShowToast ] = useState(false);
  let [ toastText, setToastText ] = useState("");
  let [ postData, setPostData ] = useState([]);

  
  // Fetch blog data from api.
  useEffect(() => {
      axios.get("http://localhost:3000/api/posts")
      .then(res => {
        setPostData(res.data);
      })
    }, []);


  // Show 'toast' component for 5 seconds before dismissing.
  useEffect(() => {
    if (showToast) {
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [showToast]);

  return (
    <div className="App">
      <NavigationBar />

      <BasicToast 
      showToast={showToast}
      setShowToast={setShowToast}
      toastText={toastText}
      />

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
            element = { 
            <CreatePost 
              postData = {postData}
              setPostData = {setPostData}
            /> }
          />

          {postData.map((post) => {
            return (
              <Route 
                exact 
                path={`/post/${post._id}`}
                key={post._id}
                element = { 
                  <Post 
                  post={post}
                  setShowToast={setShowToast}
                  setToastText={setToastText}
                  />}
              />
            )
          })}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
