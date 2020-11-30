import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { HashRouter as Router } from "react-router-dom";
import {ScrollToTop} from "./ScrollToTop";

UIkit.use(Icons);

ReactDOM.render(
    <Router>
        <ScrollToTop/>
            <App/>
    </Router>,
    document.getElementById('root')
);