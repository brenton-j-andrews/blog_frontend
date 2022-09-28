import React from 'react';

import './Styles/index.css';
import Home from './Pages/Home';
import NewPost from './Pages/NewPost';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <div className='content-wrapper'>
        <BrowserRouter>
          <Routes>
            <Route path='/posts' element={<Home />} />
            <Route path='/new_post' element={ <NewPost />} />


          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
