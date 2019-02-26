import 'babel-polyfill';

import './script/a.js';


import './css/a.css';
import './less/a.less';
import './scss/a.scss';


import React from 'react';
import ReactDOM from 'react-dom';

import Index from './component/index/index.js';

ReactDOM.render(
    <div>
        <Index />
    </div>,
    document.getElementById('root')
);
