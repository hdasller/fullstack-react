import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';

/**
 * Here routes are defined
 */

ReactDOM.render(
  (<Router history={browserHistory}>
  	<Route path="/" component={App}>
  		<IndexRoute component={App}/>
	  	<Route path="**" component={App}/>
  	</Route>
  </Router>),
  document.getElementById('root')
);
registerServiceWorker();
