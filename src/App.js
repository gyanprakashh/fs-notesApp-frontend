import React from 'react';
import './App.css';
import {Notes} from './components/Notes'
import {AddItem} from './components/AddItem'
import {Search} from './components/Search'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
      <Router>
        <div>
          <nav>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/add-item'>Add Items</Link>
            </li>
            <li>
              <Link to='/search'>Search</Link>
            </li>
          </nav>

          <Switch>
            <Route exact path='/'>
              <Notes />
            </Route>
            <Route exact path='/add-item'>
              <AddItem />
            </Route>
            <Route path='/search'>
              <Search />
            </Route>
          </Switch>
        </div>

      </Router>



    {/* <AddItem />
    <Search />
    <Notes /> */}
     </div>
    </div>
  );
}

export default App;
