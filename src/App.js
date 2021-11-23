import './App.css';

import { InputText } from 'primereact/inputtext'

import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
import 'primereact/resources/primereact.min.css'                    //core css
import 'primeicons/primeicons.css'                                  //icons

import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import axios from 'axios';


import React, { Component } from 'react';
// import React, { useState } from 'react';

axios.defaults.headers.common['x-api-key'] = 'de3fa169-c9be-47c0-9dbe-ca9ef320b83b' // for all requests

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

        currentpics : []
    };

    this.items = null;

    this.onBreedChange = this.onBreedChange.bind(this);
  }

onBreedChange(e) {
  console.log(e.value);
  this.setState({ selectedBreed: e.value });

  const url = 'https://api.thecatapi.com/v1/images/search?page=10&limit=10&breed_id=' 
        + e.value.id;

  // https://api.thecatapi.com/v1/images/search?breed_ids={breed-id}

  // https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id=aege

  // https://api.thecatapi.com/v1/images/search?breed_ids=beng

  axios.get(url)
      .then(res => {
        console.log( res.data );

        this.setState({ currentpics: res.data });
      })

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

  // var picList = this.state.items.map(item => <div> {item} </div>)

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
                <div>
                  <ul>
                  {
                    this.state.currentpics.map(
                          (obj) => 
                          <Card key={obj.id}>
                            <img src={obj.url} alt={obj.url} 
                                height="20%" width="20%"
                                />
                            <br />
                            <Button label="View Details" 
                                className="p-button-outlined" />
                          </Card>
                        )
                  }
                  </ul>



                {/* <Card
                    style={{ width: '25rem', marginBottom: '2em' }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </Card> */}
                </div>
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
