
import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
import 'primereact/resources/primereact.min.css'                    //core css
import 'primeicons/primeicons.css' 

import axios from 'axios';


import React, { Component } from 'react';
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import CatInfo from './CatInfo';
import AllCats from './AllCats';

axios.defaults.headers.common['x-api-key'] = 'de3fa169-c9be-47c0-9dbe-ca9ef320b83b' // for all requests

export default function Browse() {
  
  let params = useParams();
  return (
    
    <AllCats catbreedid={params.thebreed} />

  );
  
}