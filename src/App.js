import logo from './logo.svg';
import './App.css';

import { InputText } from 'primereact/inputtext'

import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
import 'primereact/resources/primereact.min.css'                    //core css
import 'primeicons/primeicons.css'                                  //icons

import { Dropdown } from 'primereact/dropdown';

import axios from 'axios';


import React, { useState, Component } from 'react';


class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {
        value1: '',
        error: null,
        isLoaded: false,
        items: [],
        selectedBreed: null,
    };

    this.items = null;

    this.onBreedChange = this.onBreedChange.bind(this);
  }

onBreedChange(e) {
  console.log(e.value);
  this.setState({ selectedBreed: e.value });
}

componentDidMount() {
  axios.get('https://api.thecatapi.com/v1/breeds')
    .then(res => {
      const breeds = res.data;
      this.items = breeds;

      this.setState({items: breeds});
    })
}

render() {
    return (
        <div>
            <div className="card">
                <h5>Basic</h5>
                <InputText value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
                <span className="p-ml-2">{this.state.value1}</span>
                <br />
                ==========================
                <br />
                <h5>Basic</h5>
                    <Dropdown 
                    value={this.state.selectedBreed} 
                    options={this.items} 
                    onChange={this.onBreedChange}
                    optionLabel="name" 
                    filter showClear filterBy="name" 
                    placeholder="Select a cat breed" />
                <br />
                ============
                <br />
            </div>
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
