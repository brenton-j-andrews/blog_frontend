import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './Styles/index.css';

import Home from './Pages/Home';
import NewPost from './Pages/NewPost';

function App() {

  return (
    <div className="App">
      <div className='content-wrapper'>

        <BrowserRouter basename='/blog'>
          <Routes>
            <Route path="/" element={ <Navigate to="/posts" /> } />
            <Route path='/posts' element={<Home />} />
            <Route path='/new_post' element={ <NewPost />} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
