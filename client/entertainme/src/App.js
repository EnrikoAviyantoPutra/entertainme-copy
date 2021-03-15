import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './config/index'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Favorite from './pages/Favorite'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <ApolloProvider client={client}>
          <div>
            <Navbar />
            <Switch>
              <Route path="/favorite">
                <Favorite />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </ApolloProvider>
      </Router>
    </>
  )
}

export default App;
