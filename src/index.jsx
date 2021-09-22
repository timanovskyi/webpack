import Post from '@models/post'
import json from './assets/json.json'
import './styles/style.css'
import './styles/less.less'
import './styles/sass.sass'
import xml from './assets/data.xml'
import csv from './assets/data.csv'
import WebpackLogo from './assets/webpack-logo.png'

import './babel'


// import * as $ from 'jquery'


import React from 'react'
import {render} from 'react-dom'

const post = new Post('title', WebpackLogo);

// $('pre').addClass('code').html(post.toString())


console.log('Post', post.toString())
console.log('json', json);
console.log('xml', xml);
console.log('csv', csv);

const App = () => (
    <div className="container">
        <h1>test</h1>
        <hr/>
        <div className="logo"/>

        <hr/>
        <pre/>

        <hr/>
        <div className="box">
            <h2>sdssss</h2>
        </div>

    </div>
);

render(<App/>, document.getElementById('app'))
