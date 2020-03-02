import React from 'react';
import NavBar from './NavBar';
import Empty from './pages/EmptyPage';
import Detail from './pages/Detail';
import Create from './pages/Create';
import Overview from './pages/Overview'
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@ui5/webcomponents-react/lib/ThemeProvider';
import './App.css';

function App() {
  return (
      <ThemeProvider>
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route path="/" exact component={Overview} refresh/>
              <Route path="/create"  component={Create} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/detail/:id" component={Detail} />
              <Route path="/" component={Empty} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
  );
}

export default App;
