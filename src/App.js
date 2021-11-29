import './routes/App.css';

import { Link, Outlet } from "react-router-dom";

import React, { Component } from 'react';
// import React, { useState } from 'react';


class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  

  render() 
  {
    return (
      <div>
        <h1>Cat Facts!</h1>
        
        <h3>
          <Link to="/browse">Browse Cats</Link>
          {/* &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;
          <Link to="/moreinfo">Cat FACTS!</Link> */}
        </h3>
        <hr />
        <Outlet />
        {/* <AllCats /> */}

      </div>
    )
}



  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     text: "React"
  //   };
  //   // Binding method
  // }


  // render(){
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
            
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>

  //         {text}
  
  //         {/* <InputText value={text} onChange={e => setText(e.target.value)} />
  
  //         <hr />
  //         {text} */}
  //         <hr />
  //       </header>
  //     </div>
  //   );

  // }
}

// function App() {
//   const [text, setText] = useState('');
  

  
// }

export default App;
