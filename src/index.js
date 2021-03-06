import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'primeflex/primeflex.css';

import Browse from './routes/Browse';
import CatInfo from './routes/CatInfo';
import BreedInfo from './routes/BreedInfo';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route
 } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="browse" element={<Browse />}>
        </Route>
        <Route path="moreinfo" element={<CatInfo />}>
        </Route>
        <Route path="breedinfo/:breedid/:imageid" element={<BreedInfo />} />
        <Route path="browse/:thebreed" element={<Browse />} />
        
      </Route>
      
    </Routes>
  </BrowserRouter>,
  // <React.StrictMode>
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
