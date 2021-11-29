
import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
import 'primereact/resources/primereact.min.css'                    //core css
import 'primeicons/primeicons.css' 

import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

import axios from 'axios';

import React, { Component } from 'react';
import { Link } from "react-router-dom";

axios.defaults.headers.common['x-api-key'] = 'de3fa169-c9be-47c0-9dbe-ca9ef320b83b' // for all requests

class CatInfo extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            breedId : props.catbreedid,
            imageId : props.imageid,
            imageURL : 'https://cdn2.thecatapi.com/images/'+ props.imageid + '.jpg',
            breedInfo: {}
        };

    }

    componentDidMount() {

        const url = 'https://api.thecatapi.com/v1/images/search?breed_id=' 
            + this.state.breedId;
        axios.get(url)
            .then(res => {
                const info = res.data;

                this.setState({breedInfo: info[0].breeds[0]});

            })
    }

    render()
    {
        return (
            <div>
                <Link
                    to={'/browse/' + this.state.breedId }
                    key={this.state.breedId}>
                        <Button label="Go Back" 
                            className="p-button-outlined" />
                </Link>
                <br /><br />
                <Panel header={this.state.breedInfo.name}>
                    <h3> Origin : {this.state.breedInfo.origin} </h3>
                    <img src={this.state.imageURL} height="80%" width="80%"
                        alt="catpic.jpg" />
                    <br />
                    <h5> {this.state.breedInfo.temperament} </h5>
                    <br />
                    {this.state.breedInfo.description}
                </Panel>
                <br /><br />
                <Link
                    to={'/browse/' + this.state.breedId }>
                        <Button label="Go Back" 
                            className="p-button-outlined" />
                </Link>
                
                <br /><br />
            </div>
        )
    }
}

export default CatInfo;
