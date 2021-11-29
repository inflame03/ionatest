import './App.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
import 'primereact/resources/primereact.min.css'                    //core css
import 'primeicons/primeicons.css'                                  //icons

import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import axios from 'axios';

import { Link  } from "react-router-dom";


import React, { Component } from 'react';

// import React, { useState } from 'react';

axios.defaults.headers.common['x-api-key'] = 'de3fa169-c9be-47c0-9dbe-ca9ef320b83b' // for all requests

class AllCats extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            value1: '',
            error: null,
            isLoaded: false,
            items: [],
            dropdownValue: null,
            selectedBreed: null,
            preloadedBreed : props.catbreedid,
            currentpics : [],
            currPage : 1,
            foundMore: false
        };

        this.items = null;

        this.onBreedChange = this.onBreedChange.bind(this);
        this.loadMoreClicked = this.loadMoreClicked.bind(this);
        this.getCatPics = this.getCatPics.bind(this);
    }

    onBreedChange(e) {
        this.setState({ selectedBreed: e.value });

        if( e.value != null && e.value !== undefined)
            this.getCatPics( e.value.id );

    }

    getCatPics(breedid)
    {
        const url = 'https://api.thecatapi.com/v1/images/search?page=' 
            + this.state.currPage + '&limit=10&breed_id=' 
            + breedid;

        axios.get(url)
            .then(res => {
                this.setState({ currentpics: res.data });
                let btn = document.getElementById('btnLoadMore');
                btn.style.display = 'block';
            })
    }

    componentDidMount() 
    {
        // const breedid = this.props.match.params.id;
        axios.get('https://api.thecatapi.com/v1/breeds')
            .then(res => {
                const breeds = res.data;
                this.items = breeds;

                this.setState({items: breeds});

                if( this.state.preloadedBreed != null 
                    && this.state.preloadedBreed !== undefined)
                {
                    const url = 'https://api.thecatapi.com/v1/images/search?breed_id=' 
                        + this.state.preloadedBreed;
                    
                    axios.get(url)
                        .then(res => {
                            const info = res.data;

                            this.setState({selectedBreed: info[0].breeds[0]});
                            this.getCatPics(this.state.preloadedBreed);
                        })

                    
                }
        })
    }

    findImageById (array, id) {
        return array.find((element) => {
          return element.id === id;
        })
    }

    loadMoreClicked()
    {
        const theBreed = this.state.selectedBreed.id

        const url = 'https://api.thecatapi.com/v1/images/search?page=' 
            + (this.state.currPage + 1)  + '&limit=10&breed_id=' 
            + theBreed;

        
        this.setState({currPage: this.state.currPage + 1});

        axios.get(url)
            .then(res => {
                const retrieved = res.data
                let tempId;
                let foundImg
                this.setState({foundMore: false});

                for( let ctr = 0 ; ctr < retrieved.length ; ctr ++ )
                {
                    tempId = retrieved[ctr].id;

                    foundImg = this.findImageById(this.state.currentpics, tempId);

                    if( foundImg === undefined )
                    {
                        this.setState(previousState => ({
                            currentpics: [...previousState.currentpics, retrieved[ctr]]
                        }));
                        this.setState({foundMore: true});
                    }
                }

                if( this.state.foundMore === false )
                {
                    let btn = document.getElementById('btnLoadMore');
                    btn.style.display = 'none';
                }
            })
    }

    render() 
    {
        return (
            <div>
                <div className="card">
                    <h3>Select Breed</h3>
                        <Dropdown 
                        value={this.state.selectedBreed} 
                        options={this.items} 
                        onChange={this.onBreedChange}
                        optionLabel="name" 
                        filter filterBy="name" 
                        placeholder="Select a cat breed"  />
                    <br />
                    <br />
                    <div className="card"> 
                        <div className="p-grid"> 
                            {
                                this.state.currentpics.map(
                                    (obj) => 
                                    <div  key={obj.id} className="p-col-12 p-md-4">
                                        <Card>
                                            <img src={obj.url} alt={obj.url} 
                                                width="250px"
                                                />
                                            <br />
                                            <Link
                                                to={'/breedinfo/' 
                                                    + 
                                                        this.state.selectedBreed.id 
                                                    + '/' + obj.id }
                                                key={obj.id}>
                                                <Button label="View Details" 
                                                    className="p-button-outlined" />
                                            </Link>
                                        </Card>
                                    </div>
                                    )
                            }
                        </div>
                    </div>
                    <div>
                        <br />
                        <br />
                        <br />
                            <Button id='btnLoadMore'
                                label="Load More" onClick={this.loadMoreClicked}
                                className="p-button-button p-button-success p-button-rounded " />
                            
                    </div>
                </div>
            </div>
        )
    }



}


export default AllCats;

// export default (props) => (
//     <TaskDetail
//         {...props}
//         params={useParams()}
//     />
// );
