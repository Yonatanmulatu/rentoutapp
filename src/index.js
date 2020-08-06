import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

ReactDOM.render(
    // <BrowserRouter>
    //     <div>
    //         <Route component={App}/>
    //         <Route path='/Find ' render={() => <h3></h3>}/>
    //     </div>
    // </BrowserRouter>

            <BrowserRouter>
                <App />
            </BrowserRouter>,
    document.getElementById('root')
);

