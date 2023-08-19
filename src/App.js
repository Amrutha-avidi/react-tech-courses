import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import TechItemDetails from './components/TechItemDetails'
import TechEra from './components/TechEra'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/courses/:id" component={TechItemDetails} />
      <Route exact path="/" component={TechEra} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
